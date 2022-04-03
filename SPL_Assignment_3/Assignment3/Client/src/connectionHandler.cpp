#include <connectionHandler.h>
#include <boost/algorithm/string.hpp>
#include <string.h>

#include <iomanip>

using boost::asio::ip::tcp;
using std::cin;
using std::cout;
using std::cerr;
using std::endl;
using std::string;

ConnectionHandler::ConnectionHandler(string host, short port) : host_(host), port_(port), io_service_(),
                                                                socket_(io_service_), errorAckNotification(""),
                                                                messageType("") {}

ConnectionHandler::~ConnectionHandler() {
    close();
}

bool ConnectionHandler::connect() {
    std::cout << "Starting connect to "
              << host_ << ":" << port_ << std::endl;
    try {
        tcp::endpoint endpoint(boost::asio::ip::address::from_string(host_), port_); // the server endpoint
        boost::system::error_code error;
        socket_.connect(endpoint, error);
        if (error)
            throw boost::system::system_error(error);
    }
    catch (std::exception &e) {
        std::cerr << "Connection failed (Error: " << e.what() << ')' << std::endl;
        return false;
    }
    cout << "Connected" << endl;
    return true;
}

bool ConnectionHandler::getBytes(char bytes[], unsigned int bytesToRead) {
    size_t tmp = 0;
    boost::system::error_code error;
    try {
        while (!error && bytesToRead > tmp) {

            tmp += socket_.read_some(boost::asio::buffer(bytes + tmp, bytesToRead - tmp), error);
        }
        if (error)
            throw boost::system::system_error(error);
    } catch (std::exception &e) {
std::cerr << "recv failed (Error: " << e.what() << ')' << std::endl;        return false;
    }
    return true;
}

bool ConnectionHandler::sendBytes(const char bytes[], int bytesToWrite) {
    int tmp = 0;
    boost::system::error_code error;
    try {
        while (!error && bytesToWrite > tmp) {
            tmp += socket_.write_some(boost::asio::buffer(bytes + tmp, bytesToWrite - tmp), error);
        }
        if (error)
            throw boost::system::system_error(error);
    } catch (std::exception &e) {
std::cerr << "recv failed (Error: " << e.what() << ')' << std::endl;        return false;
    }

    return true;
}

bool ConnectionHandler::getLine(std::string &line) {
    return getFrameAscii(line, ';');
}

std::string getCurrentTime() {
    auto t = std::time(nullptr);
    auto tm = *std::localtime(&t);
    std::ostringstream oss;
    oss << std::put_time(&tm, "%d-%m-%Y %H:%M");
    auto str = oss.str();
    return str;
}

bool ConnectionHandler::sendLine(std::string &line) {

    std::string opcode;
    std::vector<std::string> args;
    boost::split(args, line, boost::is_any_of(" "));
    std::string command = args.at(0);
//    std::string modifiedLine;
    args.erase(args.begin());


    if (command.compare("REGISTER") == 0) {
        char modifiedLine[line.size() - command.size() + 2];
        opcode = "01";
        int firstIndex = strlen("REGISTER") + 1;
        line = line.substr(firstIndex, line.size());
        line = opcode + line;

        for (unsigned int i = 0; i < line.size(); i++) {
            if (line[i] == ' ') {
                modifiedLine[i] = '\0';
            } else {
                modifiedLine[i] = line[i];
            }
        }
        int size = sizeof(modifiedLine) / sizeof(modifiedLine[0]);
        modifiedLine[size - 1] = ';';
        return sendBytes(modifiedLine, size);

    } else if (command.compare("LOGIN") == 0) {
        char modifiedLine[line.size() - command.size() + 2];
        opcode = "02";
        int firstIndex = strlen("LOGIN") + 1;
        line = line.substr(firstIndex);
        line = opcode + line;

        for (unsigned int i = 0; i < line.size(); i++) {
            if (line[i] == ' ') {
                modifiedLine[i] = '\0';
            } else {
                modifiedLine[i] = line[i];
            }
        }
        int size = sizeof(modifiedLine) / sizeof(modifiedLine[0]);
        modifiedLine[size - 1] = ';';
        return sendBytes(modifiedLine, size);

    } else if (command.compare("LOGOUT") == 0) {
        char modifiedLine[3];
        opcode = "03";
        modifiedLine[0] = '0';
        modifiedLine[1] = '3';
        modifiedLine[2] = ';';
        return sendBytes(modifiedLine, 3);

    } else if (command.compare("FOLLOW") == 0) {
        opcode = "04";
        char modifiedLine[line.size() - command.size() + 2];
        int firstIndex = strlen("FOLLOW") + 1;
        line = line.substr(firstIndex, line.size());
        line = opcode + line;

        int currIndex = 0;
        for (unsigned int i = 0; i < line.size(); i++) {
            if (line[i] != ' ') {
                modifiedLine[currIndex] = line[i];
                currIndex++;
            }
        }

        int size = sizeof(modifiedLine) / sizeof(modifiedLine[0]);
        modifiedLine[size - 2] = '\0';
        modifiedLine[size - 1] = ';';
        return sendBytes(modifiedLine, size);

    } else if (command.compare("POST") == 0) {
        opcode = "05";
        char modifiedLine[line.size() - command.size() + 3];
        int firstIndex = strlen("POST") + 1;
        line = line.substr(firstIndex);
        line = opcode + line;

        for (unsigned int i = 0; i < line.size(); i++) {
            modifiedLine[i] = line[i];
        }

        int size = sizeof(modifiedLine) / sizeof(modifiedLine[0]);
        modifiedLine[size - 2] = '\0';
        modifiedLine[size - 1] = ';';

        return sendBytes(modifiedLine, size);

    } else if (command.compare("PM") == 0) {
        opcode = "06";
        char modifiedLine[line.size() - command.size() + 19];
        int firstIndex = strlen("PM") + 1;
        line = line.substr(firstIndex, line.size());
        line = opcode + line;

        int firstSpaceIndex = 0;
        while(line[firstSpaceIndex] != ' '){
            firstSpaceIndex++;
        }

        unsigned int currIndex = 0;
        for (unsigned int i = 0; i < line.size(); ++i) {
            modifiedLine[currIndex] = line[currIndex];
            currIndex++;
        }
        modifiedLine[currIndex] = '\0';
        currIndex++;
        modifiedLine[firstSpaceIndex] = '\0';
        std::string time = getCurrentTime();
        for (unsigned int j = 0; j < time.size(); j++) {
            modifiedLine[currIndex] = time[j];
            currIndex++;
        }
        modifiedLine[currIndex] = '\0';
        int size = sizeof(modifiedLine) / sizeof(modifiedLine[0]);
        modifiedLine[size-1] = ';';
        return sendBytes(modifiedLine, size);

    } else if (command.compare("LOGSTAT") == 0) {
        char modifiedLine[3];
        opcode = "07";
        modifiedLine[0] = '0';
        modifiedLine[1] = '7';
        modifiedLine[2] = ';';
        return sendBytes(modifiedLine, 3);

    } else if (command.compare("STAT") == 0) {
        opcode = "08";
        char modifiedLine[line.size() - command.size() + 3];
        int firstIndex = strlen("STAT") + 1;
        line = line.substr(firstIndex, line.size());
        line = opcode + line;
        for (unsigned int i = 0; i < line.size(); i++) {
            modifiedLine[i] = line[i];
        }
        int size = sizeof(modifiedLine) / sizeof(modifiedLine[0]);
        modifiedLine[size - 2] = '\0';
        modifiedLine[sizeof(modifiedLine) / sizeof(modifiedLine[0]) - 1] = ';';
        return sendBytes(modifiedLine, size);

    } else if (command.compare("BLOCK") == 0) {
        opcode = "12";
        char modifiedLine[line.size() - command.size() + 3];
        int firstIndex = strlen("BLOCK") + 1;
        line = line.substr(firstIndex, line.size());
        line = opcode + line;
        for (unsigned int i = 0; i < line.size(); i++) {
            modifiedLine[i] = line[i];
        }
        int size = sizeof(modifiedLine) / sizeof(modifiedLine[0]);
        modifiedLine[size - 2] = '\0';
        modifiedLine[sizeof(modifiedLine) / sizeof(modifiedLine[0]) - 1] = ';';
        return sendBytes(modifiedLine, size);
    }
    return false;
}

bool ConnectionHandler::getFrameAscii(std::string &frame, char delimiter) {
    char ch;
    // Stop when we encounter the null character.
    // Notice that the null character is not appended to the frame string

    if (!ConnectionHandler::ErrorOrAck()) {
        return false;
    }
    if (errorAckNotification != "09") {

        if (errorAckNotification == "10") {
            frame.append("ACK ");
        }
        if (errorAckNotification == "11") {
            frame.append("ERROR ");
        }
        if (!ConnectionHandler::msgType()) {
            return false;
        }
        if (messageType != "12") {
            messageType = messageType.substr(1, 1);
        }
        frame.append(messageType);
        frame.append(1, ' ');
        try {
            do {
                getBytes(&ch, 1);
                frame.append(1, ch);
            } while (delimiter != ch);
        } catch (std::exception &e) {
           std::cerr << "recv failed (Error: " << e.what() << ')' << std::endl;
            return false;
        }
        try {
            getBytes(&ch, 1); } catch (std::exception &e) {
           std::cerr << "recv failed (Error: " << e.what() << ')' << std::endl;
            return false;
        }

       // messageType.clear();
       //errorAckNotification.clear();
        return true;

    } else {
        frame.append("NOTIFICATION ");
        bool flag = true;
        try {
            do {
                getBytes(&ch, 1);
                if (flag) {
                    if (ch == '0') {
                        frame.append("PM");
                    } else {
                        frame.append("POST");
                    }
                    flag = false;
                    getBytes(&ch, 1);
                }
                if (ch == '\0') {
                    frame.append(1, ' ');
                } else {
                    frame.append(1, ch);
                }
            } while (delimiter != ch);
        } catch (std::exception &e) {
           std::cerr << "recv failed (Error: " << e.what() << ')' << std::endl;
            return false;
        }
        try {
            getBytes(&ch, 1); } catch (std::exception &e) {
           std::cerr << "recv failed (Error: " << e.what() << ')' << std::endl;
            return false;
        }
        return true;
    }
}

bool ConnectionHandler::sendFrameAscii(const std::string &frame, char delimiter) {
    cout << "sending " << frame << endl;
    bool result = sendBytes(frame.c_str(), frame.length());
    if (!result) return false;
    return sendBytes(&delimiter, 1);
}

// Close down the connection properly.
void ConnectionHandler::close() {
    try {

        socket_.close();
    } catch (...) {
        std::cout << "closing failed: connection already closed" << std::endl;
    }
}

bool ConnectionHandler::
ErrorOrAck() {
    errorAckNotification.clear();

    char ch;
    // Stop when we encounter the null character.
    // Notice that the null character is not appended to the frame string.
    try {
        do {
            getBytes(&ch, 1);
            errorAckNotification.append(1, ch);
        } while (errorAckNotification.size() < 2);
    } catch (std::exception &e) {
       std::cerr << "recv failed (Error: " << e.what() << ')' << std::endl;
        return false;
    }
    return true;
}

bool ConnectionHandler::msgType() {
    this->messageType.clear();
    char ch;
    // Stop when we encounter the null character.
    // Notice that the null character is not appended to the frame string.
    try {
        do {
            getBytes(&ch, 1);
            messageType.append(1, ch);
        } while (messageType.size() < 2);
    } catch (std::exception &e) {
std::cerr << "recv failed (Error: " << e.what() << ')' << std::endl;        return false;
    }
    return true;
}