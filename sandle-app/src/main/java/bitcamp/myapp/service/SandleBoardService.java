package bitcamp.myapp.service;

import java.util.List;
import bitcamp.myapp.vo.SandleBoard;

public interface SandleBoardService {
  SandleBoard get(int no);
  List<SandleBoard> list();
}
