import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import { AuthPlugin, useAuth, useSession } from "@better-auth-ui/react";
import { AuthConfig } from "@better-auth-ui/core";
import { useSetActiveSession } from "@better-auth-ui/react/plugins/multi-session";

expect.extend(toHaveNoViolations);

// Stubs IntersectionObserver, which is used for next/link prefetching, since it is not implemented in jsdom
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = "";
  thresholds = [];
}

global.IntersectionObserver = IntersectionObserverStub;

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.HTMLElement.prototype.hasPointerCapture = jest.fn();
window.HTMLElement.prototype.releasePointerCapture = jest.fn();

jest.mock(
  "@better-auth-ui/react",
  () => ({
    useAuth: jest.fn(),
    useSession: jest.fn(),
  }),
  { virtual: true },
);

jest.mock(
  "@better-auth-ui/react/plugins/multi-session",
  () => ({
    useSetActiveSession: jest.fn(),
  }),
  { virtual: true },
);

const mockedUseAuth = jest.mocked(useAuth)
const mockedUseSession = jest.mocked(useSession)
const mockedUseSetActiveSession = jest.mocked(useSetActiveSession)

beforeEach(() => {
  mockedUseAuth.mockReturnValue({
    localization: {
      auth: {
        account: ""
      }
    },
    plugins: [] as AuthPlugin[]
  } as AuthConfig)
  mockedUseSession.mockReturnValue({})
  mockedUseSetActiveSession.mockReturnValue({})
})
