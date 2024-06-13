import { BrandModel } from "@/models/brand.schema";
import { BrandType } from "@/types/userType";

export const getBrands = async () => {
  const brands = await BrandModel.find();
  return brands;
};

export const createBrand = async (
  brandTitle: String,
  img: String
): Promise<BrandType> => {
  const createBrand = await BrandModel.create({
    brandTitle,
    img,
  });
  return createBrand;
};

export const deleteBrand = async (id: string) => {
  const deleteThisBrand = await BrandModel.deleteOne({ _id: id });
  return deleteThisBrand;
};

export const editBrand = async (BrandData: BrandType) => {
  const editBrands = await BrandModel.updateOne(
    { _id: BrandData.id },
    {
      brandTitle: BrandData.brandTitle,
      img: BrandData.img,
    }
  );
  return editBrands;
};
