import { ExecutionMode, ExecutionState, ExecutionEngine } from "../../execution-engine";
import { LibraryTypeDefinition, LibraryPropertyDefinition, LibraryMethodDefinition } from "../supported-libraries";
import { DocumentationResources } from "../../strings/documentation";

export class ProgramLibrary implements LibraryTypeDefinition {
    private _pause: LibraryMethodDefinition = {
        description: DocumentationResources.Program_Pause,
        parameters: {},
        returnsValue: false,
        execute: (engine: ExecutionEngine, mode: ExecutionMode) => {
            if (engine.state === ExecutionState.Paused) {
                engine.state = ExecutionState.Running;
            } else if (mode === ExecutionMode.Debug) {
                engine.state = ExecutionState.Paused;
            }

            return true;
        }
    };

    private _end: LibraryMethodDefinition = {
        description: DocumentationResources.Program_End,
        parameters: {},
        returnsValue: false,
        execute: (engine: ExecutionEngine) => {
            engine.terminate();
            return true;
        }
    };

    public readonly description: string = DocumentationResources.Program;

    public readonly methods: { readonly [name: string]: LibraryMethodDefinition } = {
        Pause: this._pause,
        End: this._end
    };

    public readonly properties: { readonly [name: string]: LibraryPropertyDefinition } = {
    };
}
