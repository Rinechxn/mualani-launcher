#include "mainwindow.hpp"
#include <QApplication>
#include "cef_app.h"

class QtCefApp : public QApplication, public CefApp {
public:
    QtCefApp(int &argc, char **argv) : QApplication(argc, argv) {}

    virtual void OnBeforeCommandLineProcessing(
        const CefString& process_type,
        CefRefPtr<CefCommandLine> command_line) override {
        command_line->AppendSwitch("disable-gpu");
        command_line->AppendSwitch("disable-gpu-compositing");
    }

    IMPLEMENT_REFCOUNTING(QtCefApp);
};

int main(int argc, char *argv[]) {
    CefMainArgs main_args(argc, argv);
  
    CefSettings settings;
    settings.no_sandbox = true;

    CefRefPtr<QtCefApp> app(new QtCefApp(argc, argv));

    if (CefInitialize(main_args, settings, app.get(), nullptr)) {
        MainWindow w;
        w.CreateBrowser();
        w.show();

        int result = app->exec();

        CefShutdown();
        return result;
    }

    return 1;
}
