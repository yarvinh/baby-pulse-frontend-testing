export const FETAL_GROWTH_RANGES = [
    { week: 15, length_in: 4.0,  weight_min_lb: 0.14, weight_max_lb: 0.18, weight_range_lb: "0.14–0.18" },
    { week: 16, length_in: 4.6,  weight_min_lb: 0.19, weight_max_lb: 0.25, weight_range_lb: "0.19–0.25" },
    { week: 17, length_in: 5.1,  weight_min_lb: 0.26, weight_max_lb: 0.36, weight_range_lb: "0.26–0.36" },
    { week: 18, length_in: 5.6,  weight_min_lb: 0.36, weight_max_lb: 0.48, weight_range_lb: "0.36–0.48" },
    { week: 19, length_in: 6.0,  weight_min_lb: 0.45, weight_max_lb: 0.61, weight_range_lb: "0.45–0.61" },
  
    { week: 20, length_in: 10.1, weight_min_lb: 0.56, weight_max_lb: 0.76, weight_range_lb: "0.56–0.76" },
    { week: 21, length_in: 10.5, weight_min_lb: 0.67, weight_max_lb: 0.91, weight_range_lb: "0.67–0.91" },
    { week: 22, length_in: 11.0, weight_min_lb: 0.81, weight_max_lb: 1.09, weight_range_lb: "0.81–1.09" },
    { week: 23, length_in: 11.4, weight_min_lb: 0.94, weight_max_lb: 1.27, weight_range_lb: "0.94–1.27" },
    { week: 24, length_in: 11.8, weight_min_lb: 1.12, weight_max_lb: 1.52, weight_range_lb: "1.12–1.52" },
  
    { week: 25, length_in: 13.6, weight_min_lb: 1.24, weight_max_lb: 1.68, weight_range_lb: "1.24–1.68" },
    { week: 26, length_in: 14.0, weight_min_lb: 1.43, weight_max_lb: 1.93, weight_range_lb: "1.43–1.93" },
    { week: 27, length_in: 14.4, weight_min_lb: 1.64, weight_max_lb: 2.22, weight_range_lb: "1.64–2.22" },
    { week: 28, length_in: 14.8, weight_min_lb: 1.89, weight_max_lb: 2.55, weight_range_lb: "1.89–2.55" },
    { week: 29, length_in: 15.2, weight_min_lb: 2.16, weight_max_lb: 2.92, weight_range_lb: "2.16–2.92" },
  
    { week: 30, length_in: 15.7, weight_min_lb: 2.47, weight_max_lb: 3.35, weight_range_lb: "2.47–3.35" },
    { week: 31, length_in: 16.2, weight_min_lb: 2.81, weight_max_lb: 3.81, weight_range_lb: "2.81–3.81" },
    { week: 32, length_in: 16.7, weight_min_lb: 3.19, weight_max_lb: 4.31, weight_range_lb: "3.19–4.31" },
    { week: 33, length_in: 17.2, weight_min_lb: 3.59, weight_max_lb: 4.87, weight_range_lb: "3.59–4.87" },
    { week: 34, length_in: 17.7, weight_min_lb: 4.02, weight_max_lb: 5.44, weight_range_lb: "4.02–5.44" },
  
    { week: 35, length_in: 18.2, weight_min_lb: 4.46, weight_max_lb: 6.04, weight_range_lb: "4.46–6.04" },
    { week: 36, length_in: 18.7, weight_min_lb: 4.91, weight_max_lb: 6.65, weight_range_lb: "4.91–6.65" },
    { week: 37, length_in: 19.1, weight_min_lb: 5.35, weight_max_lb: 7.24, weight_range_lb: "5.35–7.24" },
    { week: 38, length_in: 19.4, weight_min_lb: 5.78, weight_max_lb: 7.82, weight_range_lb: "5.78–7.82" },
    { week: 39, length_in: 19.7, weight_min_lb: 6.16, weight_max_lb: 8.34, weight_range_lb: "6.16-8.34" },
    { week: 40, length_in: 20.0, weight_min_lb: 6.49, weight_max_lb: 8.77, weight_range_lb: "6.49-8.77" },
  ]

  export const findFGR = (index) => {
    return FETAL_GROWTH_RANGES[index]
  }


  