import axios from "axios";
import axiosClient from "@/utils/axiosClient";
import { type Place } from "@/types/Place";

export const getSinglePlace = async (id: number): Promise<Place> => {
    try {
        const response = await axiosClient.get(`/place/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error('GetSinglePlace service error');
    }
}

export const getPLaces = async (geoWidth: number, geoHeight: number): Promise<Place[]> => {
    try {
        const response = await axiosClient.get(`/place?geoWidth=${geoWidth}&geoHeight=${geoHeight}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error('GetPlaces service error');
    }
}
