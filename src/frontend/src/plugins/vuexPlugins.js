import JWTService from "@/services/jwt.service";
import { createResources } from "@/common/helper";

export default function (store) {
  store.$jwt = JWTService;
  store.$api = createResources();
}
