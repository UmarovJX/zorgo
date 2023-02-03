import Auth from "@/services/auth"
import Settings from '@/services/settings'
import Roles from '@/services/roles'
import Permissions from "@/services/permissions";
import Users from "@/services/users";
import Services from "@/services/services";
import Dealers from "@/services/dealers";
import Brands from "@/services/brands";
import Years from "@/services/years";
import Models from "@/services/models";
import Osago from "@/services/osago";


export default {
  auth: new Auth(),
  settings: new Settings(),
  roles: new Roles(),
  permissions: new Permissions(),
  users: new Users(),
  services: new Services(),
  dealers: new Dealers(),
  brands: new Brands(),
  years: new Years(),
  models: new Models()
}
