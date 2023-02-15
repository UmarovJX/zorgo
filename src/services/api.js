import Auth from "@/services/auth"
import Roles from '@/services/roles'
import Permissions from "@/services/permissions";
import Users from "@/services/users";
import Services from "@/services/services";
import Dealers from "@/services/dealers";
import Brands from "@/services/brands";
import Years from "@/services/years";
import Models from "@/services/models";


export default {
  auth: new Auth(),
  roles: new Roles(),
  permissions: new Permissions(),
  users: new Users(),
  services: new Services(),
  dealers: new Dealers(),
  brands: new Brands(),
  years: new Years(),
  models: new Models()
}
