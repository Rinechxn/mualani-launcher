// mainwindow.cpp
#include "mainwindow.hpp"
#include <QVBoxLayout>
#include <QWidget>
#include "cef_app.h"

#define URL "http://localhost:5173"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent, Qt::FramelessWindowHint), handler_(new SimpleHandler())
{
    setWindowTitle("mualani launcher");
    resize(1280, 720);

    QWidget* central_widget = new QWidget(this);
    QVBoxLayout* layout = new QVBoxLayout(central_widget);
    setCentralWidget(central_widget);
}

MainWindow::~MainWindow() {
    if (handler_ && handler_->GetBrowser()) {
        handler_->GetBrowser()->GetHost()->CloseBrowser(true);
    }
}

void MainWindow::CreateBrowser() {
    CefWindowInfo window_info;
    CefBrowserSettings browser_settings;

    window_info.SetAsChild(centralWidget()->winId(), {0, 0, width(), height()});

    CefBrowserHost::CreateBrowser(window_info, handler_, URL, browser_settings, nullptr, nullptr);
}
