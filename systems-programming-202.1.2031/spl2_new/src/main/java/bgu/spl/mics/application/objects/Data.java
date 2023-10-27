package bgu.spl.mics.application.objects;

/**
 * Passive object representing a data used by a model.
 * Add fields and methods to this class as you see fit (including public methods and constructors).
 */
public class Data {

  private Type type;
  private int processed;
  private Model model;

  /**
   * Enum representing the Data type.
   */
  public enum Type {
    Images,
    Text,
    Tabular,
  }

  private int size;

  public Data(Type type, int size) {
    this.processed = 0;
    this.type = type;
    this.size = size;
  }

  public int getProcessed() {
    return processed;
  }

  public void setProcessed(int processed) {
    this.processed = processed;
  }

  public int getSize() {
    return size;
  }

  public Type getType() {
    return type;
  }

  public Model getModel() {
    return model;
  }

  public void setModel(Model model) {
    this.model = model;
  }
}
