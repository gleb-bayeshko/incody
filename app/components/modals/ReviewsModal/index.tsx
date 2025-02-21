import { useState } from "react";
import { toast } from "react-toastify";
import productApi from "~/api/productApi";
import ArrowLeft from "~/components/icons/ArrorLeft";
import InputText from "~/components/ui/InputText";
import Modal from "~/components/ui/Modal";
import Rating from "~/components/ui/Rating";
import Textarea from "~/components/ui/Textarea";
import type { ProductReview } from "~/pages/product/types";

interface ReviewsModalProps {
  isOpen?: boolean;
  id: string;
  shortName?: string;
  onClose?: () => void;
  reviewsData: ProductReview[];
}

function ReviewsModal({
  isOpen,
  onClose,
  reviewsData,
  id,
  shortName,
}: ReviewsModalProps) {
  const [step, setStep] = useState<number>(0);

  const [name, setName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);

  const handleClose = () => {
    setStep(0);
    onClose?.();
    setRating(null);
    setText("");
    setName("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!shortName || !name || !text || rating === null) return;

    productApi
      .postProductReview(shortName, rating, name, text)
      .then((data) => {
        toast.success(data.message);
        handleClose();
      })
      .catch(() => {
        toast.error("Произошла ошибка");
      });
  };

  return (
    <Modal id={id} isOpen={isOpen} onClose={handleClose}>
      {step === 0 && (
        <div className="">
          <div className="flex items-center justify-between pb-6 border-b-[1px] border-gray">
            <div className="text-2xl font-bold">Отзывы</div>
            <div className="flex items-center">
              <button
                className="btn btn-md btn-primary mr-6"
                onClick={() => setStep(1)}
              >
                Оставить отзыв
              </button>
              <button
                className="btn btn-sm btn-circle btn-ghost text-gray-accent"
                onClick={() => onClose?.()}
              >
                ✕
              </button>
            </div>
          </div>
          <div className="pt-6 [&>div:not(:first-child)]:mt-6 h-[calc(100%-72px)] scrollbar">
            {reviewsData.map(({ id, rating, name, text }) => (
              <div key={id}>
                <Rating rating={rating} />
                <div className="mt-1 text-base font-bold">{name}</div>
                <div className="mt-1 text-base font-light">{text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {step === 1 && (
        <form onSubmit={handleFormSubmit}>
          <div className="flex items-center justify-between pb-6">
            <div>
              <div
                className="flex flex-nowrap items-center text-gray-accent cursor-pointer"
                onClick={() => setStep(0)}
              >
                <ArrowLeft />
                <div>Назад</div>
              </div>
              <div className="text-2xl font-bold mt-2">
                Твой отзыв о покупке
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="btn btn-sm btn-circle btn-ghost text-gray-accent mt-[-40px]"
                onClick={handleClose}
              >
                ✕
              </button>
            </div>
          </div>
          <InputText
            placeholder="Имя"
            labelClassName="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="mt-3 ml-6 text-base font-light text-gray-accent flex items-center">
            <div className="mr-3">Оценка</div>
            <Rating interactive={true} onSelect={setRating} />
          </div>
          <Textarea
            className="w-full resize-none mt-3"
            placeholder="Напиши, как тебе наш сервис"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex justify-center">
            <button
              className="btn btn-md btn-primary sm:max-w-[264px] w-full mt-3"
              disabled={!name || !text || rating === null}
            >
              Опубликовать
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default ReviewsModal;
