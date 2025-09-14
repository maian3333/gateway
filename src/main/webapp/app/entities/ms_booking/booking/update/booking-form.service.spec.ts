import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../booking.test-samples';

import { BookingFormService } from './booking-form.service';

describe('Booking Form Service', () => {
  let service: BookingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingFormService);
  });

  describe('Service methods', () => {
    describe('createBookingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBookingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            userId: expect.any(Object),
            scheduleId: expect.any(Object),
            ticketIds: expect.any(Object),
            totalAmount: expect.any(Object),
            status: expect.any(Object),
            passengerDetails: expect.any(Object),
            contactEmail: expect.any(Object),
            contactPhone: expect.any(Object),
            bookingReference: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
            expiresAt: expect.any(Object),
          }),
        );
      });

      it('passing IBooking should create a new form with FormGroup', () => {
        const formGroup = service.createBookingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            userId: expect.any(Object),
            scheduleId: expect.any(Object),
            ticketIds: expect.any(Object),
            totalAmount: expect.any(Object),
            status: expect.any(Object),
            passengerDetails: expect.any(Object),
            contactEmail: expect.any(Object),
            contactPhone: expect.any(Object),
            bookingReference: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
            expiresAt: expect.any(Object),
          }),
        );
      });
    });

    describe('getBooking', () => {
      it('should return NewBooking for default Booking initial value', () => {
        const formGroup = service.createBookingFormGroup(sampleWithNewData);

        const booking = service.getBooking(formGroup) as any;

        expect(booking).toMatchObject(sampleWithNewData);
      });

      it('should return NewBooking for empty Booking initial value', () => {
        const formGroup = service.createBookingFormGroup();

        const booking = service.getBooking(formGroup) as any;

        expect(booking).toMatchObject({});
      });

      it('should return IBooking', () => {
        const formGroup = service.createBookingFormGroup(sampleWithRequiredData);

        const booking = service.getBooking(formGroup) as any;

        expect(booking).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBooking should not enable id FormControl', () => {
        const formGroup = service.createBookingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBooking should disable id FormControl', () => {
        const formGroup = service.createBookingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
