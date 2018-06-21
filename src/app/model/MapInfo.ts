
export class MapInfo {
    iconUrl: string;
    title: string;
    label: string;
    Lat: number;
    Lng: number;
    id: number;

    constructor(id:number, lat: number, long: number, icon: string, title:string, label:string){
        this.iconUrl = icon;
        this.title = title;
        this.label = label;
        this.Lat = lat;
        this.Lng = long;
        this.id = id;
    }
} 