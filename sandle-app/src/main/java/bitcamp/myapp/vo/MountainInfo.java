package bitcamp.myapp.vo;

import lombok.Data;

@Data
public class MountainInfo {
  private int no;
  private int regionId;
  private String name;
  private String height;
  private String photo;
  private String address;
  private String sunrise;
  private String sunset;
}