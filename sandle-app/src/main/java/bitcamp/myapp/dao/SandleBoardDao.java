package bitcamp.myapp.dao;

import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.SandleBoard;


@Mapper
public interface SandleBoardDao {
  SandleBoard findByNo(int no);
}
