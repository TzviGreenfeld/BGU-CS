package bgu.spl.mics.example;
import bgu.spl.mics.*;
public interface ServiceCreator {
    MicroService create(String name, String[] args);
}
