package bitcamp.myapp.service;

import java.util.List;
import bitcamp.myapp.vo.Qna;

public interface QnaService {
  void add(Qna qna);
  List<Qna> list(String keyword);
  Qna get(int no);
  Qna get(String email, String password);
  void update(Qna qna);
  void delete(int no);
}





