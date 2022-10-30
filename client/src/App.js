import React from "react";

import { MelodyInput } from "./pages/MelodyInput/MelodyInput";
import { ResultButton } from "./pages/MelodyInput/components/ResultButton/ResultButton";
import { InputField } from "./pages/MelodyInput/components/Sequencer/Input/InputField/InputField";
import { Input } from "./pages/MelodyInput/components/Sequencer/Input/Input";
import { Piano } from "./pages/MelodyInput/components/Sequencer/Piano/Piano";
import { PianoKey } from "./pages/MelodyInput/components/Sequencer/Piano/PianoKey/PianoKey";
import { Sequencer } from "./pages/MelodyInput/components/Sequencer/Sequencer";

const App = () => {
  // app logic

  return (
    <div>
      APP COMPONENT
      <MelodyInput/>

      <div>
        <Sequencer/>
        <Piano/> <PianoKey/>         <Input/> <InputField/>
      </div>

      <div>
        <ResultButton/>
      </div>
      
    </div>
  );
}

export default App;
