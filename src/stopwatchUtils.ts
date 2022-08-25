import { Clipboard, environment, showHUD } from "@raycast/api";
import { existsSync, readdirSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import moment from "moment";
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
  showHUD(files.length + " stopwatches found");
  files.forEach((stopwatchFile: string) => {
    if (extname(stopwatchFile) == ".timer") {
      const stopwatchName = readFileSync(environment.supportPath + "/" + stopwatchFile).toString();
      const stopwatchFileParts = stopwatchFile.split("---");
      console.log(stopwatchFileParts[0]);
      let now = new Date().getTime();
      let timeElapsed = new Date(now - parseInt(stopwatchFileParts[1]));
      let ahour = new Date();
      ahour.setHours(1);
      // let subtractedTime = new Date(ahour.getTime() - timeElapsed.getTime());
      const elapsedFormatted = moment(timeElapsed.getTime()).format("HH:mm:ss");
      showHUD("Time elapsed: " + elapsedFormatted);
      Clipboard.copy(elapsedFormatted);
      unlinkSync(`${environment.supportPath}/${stopwatchFile}`);
    }
  });
}

export { createAndStartStopwatch, stopAndCopyStopwatch };
