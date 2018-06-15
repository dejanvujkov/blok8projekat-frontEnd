export class ServiceModel {
  Id: number;
  Name: string;
  ImagePath: string;
  Description: string;
  Email: string;
  Offices: object;
  Vehicles: object;

  constructor(id: number, name: string, image: string, description: string, email: string) {
    this.Id = id;
    this.Name = name;
    this.ImagePath = image;
    this.Description = description;
    this.Email = email;
  }
}
