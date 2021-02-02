//package com.incomm.cca.qa.util;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.jdbc.core.RowMapper;
//import org.springframework.stereotype.Component;
//
//import javax.sql.DataSource;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.time.LocalDateTime;
//import java.time.ZoneId;
//import java.time.format.DateTimeFormatter;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//
///**
// * User: mgalloway
// * Date: 3/20/13
// * Time: 2:37 PM
// */
//@Component
//public class DatabaseUtil {
//
//	private JdbcTemplate jdbcTemplate;
//
//	@Autowired
//	DataSource datasource;
//
//	@Autowired
//	public void setDataSource( DataSource dataSource ) {
//		this.jdbcTemplate = new JdbcTemplate( dataSource );
//	}
//
//	public void closeSessionsByUsername( String username ) {
//
//		DateTimeFormatter formatter = DateTimeFormatter.ofPattern( "yyyy-MM-dd" );
//		ZoneId zoneId = ZoneId.systemDefault();
//		LocalDateTime now = LocalDateTime.now( zoneId );
//		String closeDate = now.format( formatter );
//		jdbcTemplate.execute( "UPDATE cca_session set status = 'CLOSED', closed_date = '" + closeDate + "' where user_id = (select id from cca_user where username = '" + username + "' )" );
//
//	}
//
//	public List< Map< String, Object > > getSessionLocations( String sessionId ) {
//
//		return jdbcTemplate.queryForList( "SELECT * FROM session_location WHERE session_id = ?", Long.parseLong( sessionId ) );
//
//	}
//
//	public List< Map< String, Object > > getSessionProducts( String sessionId ) {
//
//		return jdbcTemplate.queryForList( "SELECT p.identifier, i.name as identifier_type FROM session_product sp INNER JOIN product p ON p.id = sp.product_id INNER JOIN identifier_type i ON i.id = p.identifier_type_id WHERE sp.session_id = ?", Long.parseLong( sessionId ) );
//
//	}
//
//	public Map< String, Object > getSession( String sessionId ) {
//
//		return jdbcTemplate.queryForMap( "SELECT * FROM cca_session WHERE id = ?", Long.parseLong( sessionId ) );
//
//	}
//
//	public Map< String, Object > getSessionStatus( String sessionId ) {
//
//		return jdbcTemplate.queryForMap( "SELECT status.name, status.description FROM cca_session session INNER JOIN session_status status ON status.id = session.session_status_id WHERE session.id = ?", Long.parseLong( sessionId ) );
//
//	}
//
//	public Map< String, Object > getUserId( String username ) {
//
//		return jdbcTemplate.queryForMap( "SELECT id FROM cca_user WHERE username = ?", username );
//
//	}
//
//	public List< String > getDatabaseNorQueues() {
//
//		return jdbcTemplate.queryForObject( "SELECT * FROM queue q INNER JOIN queue_type qt ON qt.id = q.queue_type_id WHERE qt.name = 'NOR' AND q.active = true ORDER BY q.i3_name ASC", QUEUE_NOR_ROW_MAPPER );
//
//	}
//
//	public List< String > getDatabaseJaxQueues() {
//
//		return jdbcTemplate.queryForObject( "SELECT * FROM queue q INNER JOIN queue_type qt ON qt.id = q.queue_type_id WHERE qt.name = 'JAX' AND q.active = true ORDER BY q.i3_name ASC", QUEUE_JAX_ROW_MAPPER );
//
//	}
//
//	/**
//	 * Get call details by UID
//	 *
//	 * @param uid
//	 *
//	 * @return
//	 */
//	public Map< String, Object > getCallDetailsByUid( String uid ) {
//
//		return jdbcTemplate.queryForMap( "SELECT * FROM call_detail WHERE uid = ?", uid );
//
//	}
//
//	/**
//	 * Get call details by ID
//	 *
//	 * @param id
//	 *
//	 * @return
//	 */
//	public Map< String, Object > getCallDetailsById( String id ) {
//
//		return jdbcTemplate.queryForMap( "SELECT * FROM call_detail WHERE id = '" + id + "'" );
//
//	}
//
//	public Map< String, Object > getNote( String noteId ) {
//
//		return jdbcTemplate.queryForMap( "SELECT * FROM note WHERE id = '" + noteId + "'" );
//
//	}
//
//	public Map< String, Object > getQueueById( String queueId ) {
//
//		return jdbcTemplate.queryForMap( "SELECT * FROM queue WHERE id = '" + queueId + "'" );
//
//	}
//
//	public Map< String, Object > getQueueByName( String queueName ) {
//
//		return jdbcTemplate.queryForMap( "SELECT * FROM queue WHERE i3_name = ?", queueName );
//
//	}
//
//	/**
//	 * Returns all call queues
//	 *
//	 * @return
//	 */
//	public List< Map< String, Object > > getAllQueues() {
//
//		return jdbcTemplate.queryForList( "SELECT * FROM queue" );
//
//	}
//
//	/**
//	 * Returns all queue Wrap-Up Code Categories
//	 *
//	 * @return
//	 */
//	public List< Map< String, Object > > getWrapupCodeCategoriesByQueueId( String queueId ) {
//
//		return jdbcTemplate.queryForList( "SELECT * FROM wrap_up_code_category WHERE queue_id = ? AND active = true", queueId );
//
//	}
//
//	/**
//	 * Returns all queue Wrap-Up Codes
//	 *
//	 * @return
//	 */
//	public List< Map< String, Object > > getWrapupCodesByCategoryId( String categoryId ) {
//
//		return jdbcTemplate.queryForList( "SELECT * FROM wrap_up_code WHERE wrap_up_code_category_id = ? AND active = true", categoryId );
//
//	}
//
//	/**
//	 * Returns all products
//	 *
//	 * @return
//	 */
//	public List< Map< String, Object > > getAllProducts() {
//
//		return jdbcTemplate.queryForList( "SELECT * FROM product" );
//
//	}
//
//	public Map< String, Object > getLocationLocationNote( String noteId ) {
//
//		return jdbcTemplate.queryForMap( "SELECT * FROM location_location_note WHERE location_note_id = '" + noteId + "'" );
//
//	}
//
//	public Map< String, Object > getLatestLocationLocationNote( String locationId ) {
//
//		return jdbcTemplate.queryForMap( "SELECT * FROM location_location_note WHERE location_id = '" + locationId + "' ORDER BY location_note_id DESC LIMIT 1" );
//
//	}
//
//	public Map< String, Object > getLocationNote( String noteId ) {
//
//		return jdbcTemplate.queryForMap( "SELECT * FROM location_note WHERE id = '" + noteId + "'" );
//
//	}
//
//	public void deleteTestNotes() {
//
//		jdbcTemplate.execute( "DELETE FROM note WHERE note LIKE '%test'" );
//
//	}
//
//	public void deleteTestCallDetails() {
//
//		jdbcTemplate.execute( "DELETE FROM call_detail WHERE agent_name LIKE 'CCA_%'" );
//
//	}
//
//	public void closeSession( String sessionID ) {
//
//		jdbcTemplate.execute( "UPDATE cca_session set status = 'CLOSED' where id = " + sessionID );
//	}
//
//	public void setSelectionType( String queueName, String selectionType ) {
//
//		jdbcTemplate.execute( "UPDATE session_queue SET type = '" + selectionType + "' WHERE i3_name = '" + queueName + "'" );
//
//	}
//
//	public Map< String, Object > getRoleID( String role ) {
//
//		String query = "select id from cca_role where display_name='" + role + "'";
//		Map< String, Object > roleID = jdbcTemplate.queryForMap( query );
//		return roleID;
//
//	}
//
//	/**************** MAPPERS ****************/
//
//	private static final RowMapper< List< String > > QUEUE_JAX_ROW_MAPPER = new RowMapper< List< String > >() {
//
//		List< String > queues = new ArrayList<>();
//
//		@Override
//		public List< String > mapRow( ResultSet rs, int rowNum ) throws SQLException {
//			String first = rs.getString( "name" )
//			                 .trim();
//			queues.add( first );
//			while( rs.next() ) {
//				queues.add( rs.getString( "name" )
//				              .trim() );
//			}
//			return queues;
//		}
//	};
//
//	private static final RowMapper< List< String > > QUEUE_NOR_ROW_MAPPER = new RowMapper< List< String > >() {
//
//		List< String > queues = new ArrayList<>();
//
//		@Override
//		public List< String > mapRow( ResultSet rs, int rowNum ) throws SQLException {
//			String first = rs.getString( "name" )
//			                 .trim();
//			queues.add( first );
//			while( rs.next() ) {
//				queues.add( rs.getString( "name" )
//				              .trim() );
//			}
//			return queues;
//		}
//	};
//
//
//}
