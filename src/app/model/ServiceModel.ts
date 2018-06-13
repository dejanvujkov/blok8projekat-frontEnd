export class ServiceModel {
  Id: string;
  Name: string;
  ImagePath: string;
  Description: string;
  Email: string;
  Offices: object;
  Vehicles: object;

  constructor(id: string, name: string, image: string, description: string, email: string) {
    this.Id = id;
    this.Name = name;
    this.ImagePath = image;
    this.Description = description;
    this.Email = email;
  }
}
