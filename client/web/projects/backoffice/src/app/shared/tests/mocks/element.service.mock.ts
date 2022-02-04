import { of } from "rxjs";
import { fakeElement } from "./fakes";

export const elementServiceMock = {
  entities$: of([fakeElement]),
  loading$: of(false),
  loaded$: of(true),
  getAll: () => {},
  getWithQuery: (_) => of([fakeElement]),
  delete: () => {},
}
