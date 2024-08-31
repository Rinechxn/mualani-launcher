// simplehandler.hpp
#ifndef SIMPLEHANDLER_HPP
#define SIMPLEHANDLER_HPP

#include "cef_client.h"

class SimpleHandler : public CefClient,
                      public CefLifeSpanHandler,
                      public CefLoadHandler {
 public:
  SimpleHandler() : browser_(nullptr) {}
  
  virtual CefRefPtr<CefLifeSpanHandler> GetLifeSpanHandler() override { return this; }
  virtual CefRefPtr<CefLoadHandler> GetLoadHandler() override { return this; }

  virtual void OnAfterCreated(CefRefPtr<CefBrowser> browser) override {
    browser_ = browser;
  }

  virtual void OnBeforeClose(CefRefPtr<CefBrowser> browser) override {
    browser_ = nullptr;
  }

  CefRefPtr<CefBrowser> GetBrowser() { return browser_; }

 private:
  CefRefPtr<CefBrowser> browser_;
  IMPLEMENT_REFCOUNTING(SimpleHandler);
};

#endif // SIMPLEHANDLER_HPP