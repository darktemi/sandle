package bitcamp.myapp.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.myapp.dao.QnaDao;
import bitcamp.myapp.service.QnaService;
import bitcamp.myapp.vo.Qna;

@Service
public class DefaultQnaService implements QnaService {

  @Autowired private QnaDao qnaDao;

  @Transactional
  @Override
  public void add(Qna qna) {
    qnaDao.insert(qna);
  }

  @Override
  public List<Qna> list(String keyword) {
    return qnaDao.findAll(keyword);
  }

  @Override
  public Qna get(int no) {
    return qnaDao.findByNo(no);
  }

  @Override
  public Qna get(String email, String password) {
    Map<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("password", password);

    return qnaDao.findByEmailAndPassword(paramMap);
  }

  @Transactional
  @Override
  public void update(Qna qna) {
    if (qnaDao.update(qna) == 1) {
    } else {
      throw new RuntimeException("해당 게시글이 존재하지 않습니다.");
    }
  }

  @Transactional
  @Override
  public void delete(int no) {
    if (qnaDao.delete(no) == 1) {
    } else {
      throw new RuntimeException("해당 게시글이 존재하지 않습니다.");
    }
  }
}





