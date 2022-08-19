import { Clipboard, environment, showHUD } from "@raycast/api";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { extname } from "path";

async function createAndStartStopwatch(stopwatchName = "Stopwatch") {
  const files = readdirSync(environment.supportPath);
  const directoryName = environment.supportPath + "/" + files.length + "---" + new Date().getTime() + ".timer";
  const masterName = directoryName.replace(/:/g, "__");
  writeFileSync(masterName, stopwatchName);
}

async function stopAndCopyStopwatch() {
  // await showHUD("Time elapsed: " + (new Date().getTime() - starttime) + "ms");

  const files = readdirSync(environment.supportPath);
  files.forEach((stopwatchFile: string) => {
    if (extname(stopwatchFile) == ".timer") {
      const stopwatchName = readFileSync(environment.supportPath + "/" + stopwatchFile).toString();
      const stopwatchFileParts = stopwatchFile.split("---");
      console.log(stopwatchFileParts[0]);
      let now = new Date().getTime();
      let timeElapsed = new Date(now - parseInt(stopwatchFileParts[1]));
      showHUD("Time elapsed: " + timeElapsed.getSeconds() + " seconds");
      Clipboard.copy(timeElapsed.getSeconds().toString());
    }
  });
}

export { createAndStartStopwatch, stopAndCopyStopwatch };
