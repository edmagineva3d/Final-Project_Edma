namespace Api.Features.Bookings;

using Api.Common.Extensions;
using Application.Abstractions.Messaging;
using Application.Features.Bookings.CreateBooking;
using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.GetAllBookings;
using Application.Features.Bookings.GetBookingById;
using Application.Features.Bookings.GetBookingByReference;
using Application.Features.Bookings.UpdateBookingStatus;
using Application.Features.Bookings.ValidateCart;
using Domain.Common;

public static class BookingEndpoints
{
    public static void MapBookingEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/bookings")
            .WithTags("Bookings");

        group.MapPost("/", Create)
            .WithName("CreateBooking")
            .WithSummary("Confirm and persist a conference event reservation from shopping cart");

        group.MapGet("/", GetAll)
            .WithName("GetAllBookings")
            .WithSummary("Retrieve all confirmed conference bookings");

        group.MapGet("/{id:guid}", GetById)
            .WithName("GetBookingById")
            .WithSummary("Retrieve confirmed booking details by ID");

        group.MapGet("/reference/{reference}", GetByReference)
            .WithName("GetBookingByReference")
            .WithSummary("Retrieve confirmed booking details by unique reference code");

        group.MapPut("/{id:guid}/status", UpdateStatus)
            .WithName("UpdateBookingStatus")
            .WithSummary("Update the status or notes of an existing booking");

        // Cart validation endpoint
        var cartGroup = app.MapGroup("/api/cart")
            .WithTags("Cart");

        cartGroup.MapPost("/validate", ValidateCart)
            .WithName("ValidateCart")
            .WithSummary("Validate shopping cart contents and compute authoritative totals from database");
    }

    private static async Task<IResult> Create(
        CreateBookingCommand command,
        ICommandHandler<CreateBookingCommand, Result<BookingDto>> handler,
        CancellationToken cancellationToken)
    {
        var result = await handler.HandleAsync(command, cancellationToken);
        return result.IsSuccess
            ? TypedResults.CreatedAtRoute(result.Value, "GetBookingById", new { id = result.Value!.Id })
            : result.ToProblemDetails();
    }

    private static async Task<IResult> GetAll(
        IQueryHandler<GetAllBookingsQuery, Result<List<BookingDto>>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetAllBookingsQuery();
        var result = await handler.HandleAsync(query, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> GetById(
        Guid id,
        IQueryHandler<GetBookingByIdQuery, Result<BookingDto>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetBookingByIdQuery(id);
        var result = await handler.HandleAsync(query, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> GetByReference(
        string reference,
        IQueryHandler<GetBookingByReferenceQuery, Result<BookingDto>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetBookingByReferenceQuery(reference);
        var result = await handler.HandleAsync(query, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> UpdateStatus(
        Guid id,
        UpdateBookingStatusRequest request,
        ICommandHandler<UpdateBookingStatusCommand, Result<BookingDto>> handler,
        CancellationToken cancellationToken)
    {
        var command = new UpdateBookingStatusCommand(id, request.Status, request.SpecialRequests);
        var result = await handler.HandleAsync(command, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> ValidateCart(
        ValidateCartCommand command,
        ICommandHandler<ValidateCartCommand, Result<CartSummaryDto>> handler,
        CancellationToken cancellationToken)
    {
        var result = await handler.HandleAsync(command, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }
}

public sealed record UpdateBookingStatusRequest(string Status, string? SpecialRequests = null);

