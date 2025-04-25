class UserDto {
  email;
  id;
  isActivated;
  username;

  constructor(module) {
    this.email = module.email;
    this.id = module._id;
    this.isActivated = module.isActivated;
    this.username = module.username;
  }
}

export default UserDto;
