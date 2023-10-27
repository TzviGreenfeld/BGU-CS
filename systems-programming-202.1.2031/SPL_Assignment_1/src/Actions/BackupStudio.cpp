#include "../include/Action.h"
extern Studio* backup;

BackupStudio::BackupStudio(){};

void BackupStudio::act(Studio &studio){
    delete backup;
    backup = &studio;
    complete();
};

std::string BackupStudio::toString() const {
  return "Studio backed up";
};