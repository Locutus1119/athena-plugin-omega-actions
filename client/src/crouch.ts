import * as alt from 'alt-client';
import native from 'natives';
import { actionsSetup } from '../../shared/config/keyConfig';
//import { Key } from '../enums/keys';

const player = alt.Player.local;

let crouched = false;
alt.on('keyup', (key) => {
    if (!crouched){ 
    if (alt.isMenuOpen() || native.isPauseMenuActive()) return;
    if (key == actionsSetup.crouchKey) {
        if (
            !native.isPlayerDead(player.scriptID) &&
            !native.isPedSittingInAnyVehicle(player.scriptID)
        ) {
            //ctrl
            native.disableControlAction(0, 36, true);
            native.requestAnimSet('move_ped_crouched');

            native.setPedMovementClipset(player.scriptID, 'move_ped_crouched', 0.45);
            crouched = true;
        }
    }}
    else {
        if (key == actionsSetup.crouchKey && crouched) {
            native.clearPedTasks(player.scriptID);
            native.enableControlAction(0, 36, true);
            crouched = false;
    
            if (player.getMeta('drunk')) {
                native.setPedMovementClipset(player.scriptID, 'move_m@drunk@verydrunk', 1.0);
            } else {
                native.resetPedMovementClipset(player.scriptID, 0.45);
            }
        }
    }
});
