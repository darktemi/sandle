package bitcamp.myapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.myapp.dao.SandleBoardDao;
import bitcamp.myapp.service.SandleBoardService;
import bitcamp.myapp.vo.SandleBoard;

@Service
public class DefaultSandleBoardService implements SandleBoardService{
  @Autowired private SandleBoardDao sandleBoardDao;

  @Override
  public SandleBoard get(int no) {

    SandleBoard b = sandleBoardDao.findByNo(no);
    //    if (b != null) {
    //      boardDao.increaseViewCount(no);
    //    }
    return b;
  }
}
