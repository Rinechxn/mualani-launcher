// mainwindow.hpp
#ifndef MAINWINDOW_HPP
#define MAINWINDOW_HPP

#include <QMainWindow>
#include "simplehandler.hpp"

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

    void CreateBrowser();

private:
    CefRefPtr<SimpleHandler> handler_;
};

#endif // MAINWINDOW_HPP