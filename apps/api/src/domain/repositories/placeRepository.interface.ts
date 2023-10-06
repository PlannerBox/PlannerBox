import { PlaceM } from "../models/place";

export interface IPlaceRepository {
    getPlace(id: string): Promise<PlaceM>;
    deletePlace(id: string);
    insertPlace(place: PlaceM);
    getAllPlace(): Promise<PlaceM[]>;
    updatePlace(placeM:PlaceM);
}