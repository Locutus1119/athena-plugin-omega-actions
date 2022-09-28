import * as alt from 'alt-client';
import * as native from 'natives';
import { actionsSetup } from '../../shared/config/keyConfig';
import { data, pps } from '../../shared/config/sitConfig';
import { actionsEnum } from '../../shared/enums/enums';

let sitting = false;

let currentObj: number;
let currentType: string;

alt.on('keydown', key => {
    if (key === actionsSetup.sitKey) { 
        if (sitting) {
            alt.emitServer(actionsEnum.SitCancel, native.getEntityCoords(currentObj, false));
            Cancel();
            return;
        }
        const pos = alt.Player.local.pos;
        for (let i in pps) {
            let type = pps[i];
            let object = native.getClosestObjectOfType(pos.x, pos.y, pos.z, 2.0, alt.hash(type), false, false, false);
            if (object) {
                currentObj = object;
                currentType = type;
                alt.emitServer(actionsEnum.TrySit, native.getEntityCoords(object, false));
            }
        }
    }
})

alt.onServer(actionsEnum.Callback, (used: boolean) => !used && Sit(currentType))

function Sit(type: string) {
    if (sitting) return;

    native.disableControlAction(1, 37, true);

    native.placeObjectOnGroundProperly(currentObj);
    native.freezeEntityPosition(currentObj, true);

    let pos = native.getEntityCoords(currentObj, false);

    Object.entries(data).forEach(
        ([key, value]) => {
            if (key === type) {
                native.taskStartScenarioAtPosition(alt.Player.local, value.scenario, pos.x, pos.y, pos.z - value.verticalOffset, native.getEntityHeading(currentObj) + 180.0, 0, true, false);
            }
        }
    )

    sitting = true;
}

function Cancel() {
    if (!sitting) return;

    native.clearPedTasks(alt.Player.local);
    native.freezeEntityPosition(currentObj, false);

    sitting = false;
    currentObj = null;
    currentType = null;
}