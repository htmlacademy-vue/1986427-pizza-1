import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";

export class AuthApiService {
  async login(params) {
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");
    return data;
  }

  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async getUser() {
    const { data } = await axios.get("whoAmI");
    return data;
  }
}

export class ReadOnlyApiService {
  // resource — приватное свойство класса. Добавляем его к базовому URL, чтобы получить
  #resource;
  constructor(resource) {
    this.#resource = resource;
  }

  // запрос на получение списка сущностей
  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  // запрос на получение одной сущности по id
  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource) {
    super(resource);
    this.#resource = resource;
  }

  // запрос на создание сущности
  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  // запрос на обновление сущности
  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  // запрос на удаление сущности
  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class BuilderIngredientsApiService {
  async getIngredients() {
    const { data } = await axios.get("ingredients");
    return data;
  }

  async getSauces() {
    const { data } = await axios.get("sauces");
    return data;
  }

  async getDough() {
    const { data } = await axios.get("dough");
    return data;
  }

  async getSizes() {
    const { data } = await axios.get("sizes");
    return data;
  }
}

export class MiscApiService extends ReadOnlyApiService {
  constructor() {
    super("misc");
  }
}

export class OrdersApiService extends CrudApiService {
  constructor() {
    super("orders");
  }
}
export class AddressesApiService extends CrudApiService {
  constructor() {
    super("addresses");
  }
}
