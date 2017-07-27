#include <string>
#include "status.h"

Status::Status(std::string url) {
    s_url = url;
}

int Status::check() {
    // write code to curl url
    return 1;
}
