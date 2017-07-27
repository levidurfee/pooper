#ifndef STATUS_H
#define STATUS_H

class Status
{
private:
    std::string s_url;
public:
    Status(std::string url);

    int check();
};

#endif
