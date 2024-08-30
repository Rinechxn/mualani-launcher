// src/mainwindow.cpp
#include "mainwindow.hpp"
#include <QApplication>


MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent, Qt::FramelessWindowHint)
{
    setWindowTitle("mualani launcher");
    resize(1280, 720);
}