package bitcamp.myapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.myapp.service.SandleBoardService;
import bitcamp.myapp.vo.SandleBoard;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;

@RestController
@RequestMapping("/sandleboards")
public class SandleBoardController {

  @Autowired private SandleBoardService sandleBoardService;


  @GetMapping("{no}")
  public SandleBoard view(@PathVariable int no) {
    SandleBoard board = sandleBoardService.get(no);

    return board;
    //    if (board != null) {
    //      return new RestResult()
    //          .setStatus(RestStatus.SUCCESS)
    //          .setData(board);
    //    } else {
    //      return new RestResult()
    //          .setStatus(RestStatus.FAILURE)
    //          .setErrorCode(ErrorCode.rest.NO_DATA);
    //    }
  }
  @GetMapping
  public Object list() {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(sandleBoardService.list());
  }
}
