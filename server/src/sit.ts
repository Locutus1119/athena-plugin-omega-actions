import * as alt from 'alt-server';
import { actionsEnum } from '../../shared/enums/enums';

let seats: string[] = [];

//alt.onClient(actionsEnum.SitStart, (player: alt.Player, coords: alt.Vector3) => seats.push(coords.toString()))

alt.onClient(actionsEnum.SitCancel, (player: alt.Player, coords: alt.Vector3) => {
    for (let i in seats) seats[i] === coords.toString() && delete seats[i];
})

alt.onClient(actionsEnum.TrySit, (player: alt.Player, coords: alt.Vector3) => {
    if (seats.length === 0) return alt.emitClient(player, actionsEnum.Callback, false);
    for (let i in seats) seats[i] !== coords.toString() ? alt.emitClient(player, actionsEnum.Callback, true) : alt.emitClient(player, actionsEnum.Callback, false);
})