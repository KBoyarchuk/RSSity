import webExt from "web-ext";

class WebExtensionWebpackPlugin {
  constructor(runOptions, lintOptions) {
    this.runOptions = runOptions;
    this.lintOptions = lintOptions;
    this.extensionRunner = undefined;
  }

  cleanupRunner() {
    this.extensionRunner.exit();
    this.extensionRunner = undefined;
  }

  apply(compiler) {
    compiler.hooks.watchRun.tapPromise(
      "WebExtensionWebpackPlugin",
      async () => {
        try {
          if (this.extensionRunner) {
            await this.extensionRunner.reloadAllExtensions();
            return;
          }

          await webExt.cmd
            .run(this.runOptions, { shouldExitProgram: false })
            .then(
              (extensionRunner) => (this.extensionRunner = extensionRunner)
            );

          this.extensionRunner.registerCleanup(() => {
            this.extensionRunner = undefined;
          });
        } catch (error) {
          this.cleanupRunner();
          console.warn(`\nError reloading extension: ${error}`);
          console.log(`Reloading extension error stack: ${error.stack}`);
        }
      }
    );
    compiler.hooks.afterEmit.tapPromise(
      "WebExtensionWebpackPlugin",
      async () => {
        try {
          await webExt.cmd.lint(this.lintOptions, { shouldExitProgram: false });
        } catch (error) {
          console.warn(`\nError linting extension: ${error}`);
          console.log(`Linting extension error stack: ${error.stack}`);
        }
      }
    );
  }
}

module.exports = WebExtensionWebpackPlugin;
