import { HealthOrderResponseDto } from '../health-order-response.dto';
import { ItemHealthOrderResponseDto } from '../item-health-order-response.dto';
import { HealthOrderItem } from '../../health-order-item.entity';
import { ItemHealthOrderRequestDto } from '../item-health-order-request.dto';
import { HealthOrder } from '../../health-order.entity';
import { HealthOrderClientDto } from '../health-order-client.dto';

export class HealthOrderEntityDtoMapper {
  public static healthOrderEntityToResponseDto(quotation: HealthOrder, sentMail = undefined): HealthOrderResponseDto {
    const dto = new HealthOrderResponseDto();
    dto.id = quotation.id;
    dto.currency = quotation.currency;
    dto.totalAmount = quotation.totalAmount;
    dto.createdAt = quotation.createdAt.toISOString();
    dto.executedAt = quotation.executedAt ? quotation.executedAt.toISOString() : undefined;
    dto.sentMail = sentMail;
    dto.status = quotation.status;
    if (quotation.healthOrderItems) {
      dto.items = quotation.healthOrderItems.map(quotationItem => {
        const itemDto = new ItemHealthOrderResponseDto();
        itemDto.name = quotationItem.name;
        itemDto.itemCount = quotationItem.itemCount;
        itemDto.code = quotationItem.code;
        itemDto.unitPrice = quotationItem.unitPrice.toString();
        itemDto.totalPrice = (quotationItem.unitPrice * itemDto.itemCount).toString();
        return itemDto;
      });
    }

    if (quotation.client) {
      dto.client = new HealthOrderClientDto(
        quotation.client.id,
        quotation.client.firstName,
        quotation.client.lastName
      );
    }

    return dto;
  }

  public static healthOrderItemRequestDtoToItemDto(itemDto: ItemHealthOrderRequestDto, itemIndex = 0): HealthOrderItem {
    const item = new HealthOrderItem();
    item.id = itemIndex;
    item.name = itemDto.name;
    item.code = itemDto.code;
    item.unitPrice = Number(itemDto.unitPrice); //TODO: Transform to BigDecimal
    item.itemCount = itemDto.itemCount;
    return item;
  }
}
