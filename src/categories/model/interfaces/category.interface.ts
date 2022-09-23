/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { Document } from 'mongoose';
import { Event } from './event.interface'

export interface Category extends Document {

    readonly category: string;
    description: string;
    events: Array<Event>
    players: Array<string>
}