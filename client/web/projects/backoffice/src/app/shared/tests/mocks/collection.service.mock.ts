import { of } from "rxjs";
import { fakeCollection } from "./fakes";

export const collectionServiceMock = {
  entities$: of([fakeCollection]),
  loading$: of(false),
  getByKey: (_) => of(fakeCollection),
  update: (_) => of(fakeCollection),
  add: (_) => of(fakeCollection),
  delete: () => of(null),
  getWithQuery: (_) => of([fakeCollection]),
};
