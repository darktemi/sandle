package bitcamp.myapp.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.myapp.service.ObjectStorageService;
import bitcamp.myapp.service.QnaService;
import bitcamp.myapp.vo.Member;
import bitcamp.myapp.vo.Qna;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/qnas")
public class QnaController {

  // 입력: POST   => /qnas
  // 목록: GET    => /qnas
  // 조회: GET    => /qnas/{no}
  // 변경: PUT    => /qnas/{no}
  // 삭제: DELETE => /qnas/{no}

  Logger log = LogManager.getLogger(getClass());

  @Autowired private QnaService qnaService;
  @Autowired private ObjectStorageService objectStorageService;
  private String bucketName = "sandle-images";

  @PostMapping
  public Object insert(
      @RequestBody Qna qna,
      HttpSession session) throws Exception{

    System.out.println(qna);

    qnaService.add(qna);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping
  public Object list(String keyword) {
    log.debug("QnaController.list() 호출됨!");

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(qnaService.list(keyword));
  }

  @GetMapping("{no}")
  public Object view(@PathVariable int no) {
    Qna qna = qnaService.get(no);
    if (qna != null) {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setData(qna);
    } else {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.NO_DATA);
    }
  }

  @PutMapping("{no}")
  public Object update(
      @PathVariable int no,
      Qna qna,
      HttpSession session) throws Exception {

    Member loginUser = (Member) session.getAttribute("loginUser");

    // URL 의 번호와 요청 파라미터의 번호가 다를 경우를 방지하기 위해
    // URL의 번호를 게시글 번호로 설정한다.
    qna.setNo(no);

    Qna old = qnaService.get(qna.getNo());
    if (old.getMemberId() != loginUser.getNo()) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("권한이 없습니다.");
    }

    qnaService.update(qna);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    Qna old = qnaService.get(no);
    if (old.getMemberId() != loginUser.getNo()) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("권한이 없습니다.");
    }
    qnaService.delete(no);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }
}








