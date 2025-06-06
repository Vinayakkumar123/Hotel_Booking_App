package com.hotelbookingapp.hotelhop.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomResponse {
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked;
    private String photo;
    private String location;
    private String description;
    private List<BookingResponse>bookings;

    public RoomResponse(Long id, String roomType, BigDecimal roomPrice) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
    }
    public RoomResponse(Long id, String roomType, BigDecimal roomPrice, String location, String description) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.location = location;
        this.description = description;
    }


    public RoomResponse(Long id, String roomType, BigDecimal roomPrice, boolean isBooked,
                        byte[] photoBytes ,String location, String description, List<BookingResponse> bookings) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = (photoBytes != null) ? Base64.encodeBase64String(photoBytes) : null;
        this.location = location;
        this.description = description;
       this.bookings = bookings;
    }

}
