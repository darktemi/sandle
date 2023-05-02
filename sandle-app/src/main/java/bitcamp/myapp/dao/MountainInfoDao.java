package bitcamp.myapp.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import bitcamp.myapp.vo.MountainInfo;

@Mapper
public interface MountainInfoDao {
	List<MountainInfo> findAll(String keyword);
	List<MountainInfo> findByRegion(int regionId);
	List<MountainInfo> findByHeight(int regionId);
	List<MountainInfo> findByRegionAndAddress(@Param("regionId") int regionId, @Param("title") String title);
}







