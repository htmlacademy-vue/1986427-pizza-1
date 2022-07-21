import {
  AuthApiService,
  AddressesApiService,
  BuilderIngredientsApiService,
  OrdersApiService,
  MiscApiService,
} from "@/services/api.service";

export const isDisabled = (item) => {
  return (item?.quantity || 0) < 0;
};

export const getCount = (item) => {
  return item?.quantity || 0;
};

export const createResources = () => {
  return {
    auth: new AuthApiService(),
    builderIngredients: new BuilderIngredientsApiService(),
    misc: new MiscApiService(),
    orders: new OrdersApiService(),
    addresses: new AddressesApiService(),
  };
};
