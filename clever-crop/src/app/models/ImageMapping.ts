export class ImageMapping {
    cropsMap: Map<string, Crop>;
}

class Crop {
    url: string;
    stagesMap: Map<string, string>;
}
