import React from 'react'
import {Widgets, Operators} from 'react-awesome-query-builder'
const {
  TextWidget,
  NumberWidget,
  SelectWidget,
  MultiSelectWidget,
  DateWidget,
  BooleanWidget,
  TimeWidget,
  DateTimeWidget,
  ValueFieldWidget
} = Widgets
const {ProximityOperator} = Operators

import moment from 'moment'
import en_US from 'antd/lib/locale-provider/en_US'
import ru_RU from 'antd/lib/locale-provider/ru_RU'

export default {
  conjunctions: {
    AND: {
      label: 'And',
      formatConj: (children, conj, isForDisplay) => {
        return children.size > 1
          ? '(' + children.join(' ' + (isForDisplay ? 'and' : '&&') + ' ') + ')'
          : children.first()
      }
    },
    OR: {
      label: 'Or',
      formatConj: (children, conj, isForDisplay) => {
        return children.size > 1
          ? '(' + children.join(' ' + (isForDisplay ? 'or' : '||') + ' ') + ')'
          : children.first()
      }
    }
  },
  fields: {
    act_aspires: {
      label: 'Act Aspires',
      type: '!struct',
      subfields: {
        english_act_readiness_benchmark: {
          label: 'English Act Readiness Benchmark',
          type: 'select',
          listValues: {
            Y: 'Y'
          }
        },
        english_national_percentile_rank: {
          label: 'English National Percentile Rank',
          type: 'number'
        },
        english_readiness_level: {
          label: 'English Readiness Level',
          type: 'select',
          listValues: {
            R: 'R'
          }
        },
        english_scale_score: {
          label: 'English Scale Score',
          type: 'number'
        },
        mathematics_act_readiness_benchmark: {
          label: 'Mathematics Act Readiness Benchmark',
          type: 'select',
          listValues: {
            N: 'N'
          }
        },
        mathematics_national_percentile_rank: {
          label: 'Mathematics National Percentile Rank',
          type: 'number'
        },
        mathematics_readiness_level: {
          label: 'Mathematics Readiness Level',
          type: 'select',
          listValues: {
            N: 'N'
          }
        },
        mathematics_scale_score: {
          label: 'Mathematics Scale Score',
          type: 'number'
        },
        reading_act_readiness_benchmark: {
          label: 'Reading Act Readiness Benchmark',
          type: 'select',
          listValues: {
            N: 'N'
          }
        },
        reading_national_percentile_rank: {
          label: 'Reading National Percentile Rank',
          type: 'number'
        },
        reading_readiness_level: {
          label: 'Reading Readiness Level',
          type: 'select',
          listValues: {
            N: 'N'
          }
        },
        reading_scale_score: {
          label: 'Reading Scale Score',
          type: 'number'
        },
        science_act_readiness_benchmark: {
          label: 'Science Act Readiness Benchmark',
          type: 'select',
          listValues: {
            '': null
          }
        },
        science_national_percentile_rank: {
          label: 'Science National Percentile Rank',
          type: 'number'
        },
        science_readiness_level: {
          label: 'Science Readiness Level',
          type: 'select',
          listValues: {
            '': null
          }
        },
        science_scale_score: {
          label: 'Science Scale Score',
          type: 'number'
        },
        writing_act_readiness_benchmark: {
          label: 'Writing Act Readiness Benchmark',
          type: 'select',
          listValues: {
            '': null
          }
        },
        writing_national_percentile_rank: {
          label: 'Writing National Percentile Rank',
          type: 'number'
        },
        writing_readiness_level: {
          label: 'Writing Readiness Level',
          type: 'select',
          listValues: {
            '': null
          }
        },
        writing_scale_score: {
          label: 'Writing Scale Score',
          type: 'number'
        }
      }
    },
    act_raws: {
      label: 'Act Raws',
      type: '!struct',
      subfields: {
        act_scale_score_composite: {
          label: 'Act Scale Score Composite',
          type: 'number'
        },
        act_scale_score_english: {
          label: 'Act Scale Score English',
          type: 'number'
        },
        act_scale_score_mathematics: {
          label: 'Act Scale Score Mathematics',
          type: 'number'
        },
        act_scale_score_reading: {
          label: 'Act Scale Score Reading',
          type: 'number'
        },
        act_scale_score_science: {
          label: 'Act Scale Score Science',
          type: 'number'
        },
        act_scale_subscore_algebra_coordinate_geometry_ag: {
          label: 'Act Scale Subscore Algebra Coordinate Geometry Ag',
          type: 'number'
        },
        act_scale_subscore_arts_literature_al: {
          label: 'Act Scale Subscore Arts Literature Al',
          type: 'number'
        },
        act_scale_subscore_elementary_algebra_ea: {
          label: 'Act Scale Subscore Elementary Algebra Ea',
          type: 'number'
        },
        act_scale_subscore_plane_geometry_trigonometry_gt: {
          label: 'Act Scale Subscore Plane Geometry Trigonometry Gt',
          type: 'number'
        },
        act_scale_subscore_rhetorical_skills_rh: {
          label: 'Act Scale Subscore Rhetorical Skills Rh',
          type: 'number'
        },
        act_scale_subscore_social_studies_science_ss: {
          label: 'Act Scale Subscore Social Studies Science Ss',
          type: 'number'
        },
        act_scale_subscore_usage_mechanics_um: {
          label: 'Act Scale Subscore Usage Mechanics Um',
          type: 'number'
        }
      }
    },
    case21_algebras: {
      label: 'Case21 Algebras',
      type: '!struct',
      subfields: {
        benchmark: {
          label: 'Benchmark',
          type: 'select',
          listValues: {
            '1': 1,
            '2': 2,
            '22': 22,
            '26': 26
          }
        },
        case_projected_scale: {
          label: 'Case Projected Scale',
          type: 'number'
        },
        ms_target_scale: {
          label: 'Ms Target Scale',
          type: 'number'
        },
        percent_correct: {
          label: 'Percent Correct',
          type: 'number'
        },
        projected_achievement_level: {
          label: 'Projected Achievement Level',
          type: 'select',
          listValues: {
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '2+': '2+',
            '4-': '4-',
            'B+': 'B+',
            '1+': '1+',
            'M-': 'M-',
            '4+': '4+',
            '2-': '2-',
            'P+': 'P+',
            B: 'B',
            M: 'M',
            'A-': 'A-',
            P: 'P',
            'P-': 'P-',
            'A+': 'A+',
            'B-': 'B-',
            '1-': '1-',
            A: 'A',
            '3+': '3+',
            '5-': '5-',
            'M+': 'M+',
            '3-': '3-'
          }
        },
        projected_growth: {
          label: 'Projected Growth',
          type: 'select',
          listValues: {
            '': '',
            I: 'I',
            N: 'N',
            Y: 'Y'
          }
        },
        scale_diff: {
          label: 'Scale Diff',
          type: 'number'
        }
      }
    },
    case21_biologies: {
      label: 'Case21 Biologies',
      type: '!struct',
      subfields: {
        benchmark: {
          label: 'Benchmark',
          type: 'select',
          listValues: {
            '2': 2
          }
        },
        case_projected_scale: {
          label: 'Case Projected Scale',
          type: 'number'
        },
        ms_target_scale: {
          label: 'Ms Target Scale',
          type: 'number'
        },
        percent_correct: {
          label: 'Percent Correct',
          type: 'number'
        },
        projected_achievement_level: {
          label: 'Projected Achievement Level',
          type: 'select',
          listValues: {
            'P-': 'P-'
          }
        },
        projected_growth: {
          label: 'Projected Growth',
          type: 'select',
          listValues: {
            Y: 'Y'
          }
        },
        scale_diff: {
          label: 'Scale Diff',
          type: 'number'
        }
      }
    },
    case21_englishes: {
      label: 'Case21 Englishes',
      type: '!struct',
      subfields: {
        benchmark: {
          label: 'Benchmark',
          type: 'select',
          listValues: {
            '2': 2
          }
        },
        case_projected_scale: {
          label: 'Case Projected Scale',
          type: 'number'
        },
        ms_target_scale: {
          label: 'Ms Target Scale',
          type: 'number'
        },
        percent_correct: {
          label: 'Percent Correct',
          type: 'number'
        },
        projected_achievement_level: {
          label: 'Projected Achievement Level',
          type: 'select',
          listValues: {
            'P-': 'P-'
          }
        },
        projected_growth: {
          label: 'Projected Growth',
          type: 'select',
          listValues: {
            N: 'N'
          }
        },
        scale_diff: {
          label: 'Scale Diff',
          type: 'number'
        }
      }
    },
    case21_histories: {
      label: 'Case21 Histories',
      type: '!struct',
      subfields: {
        benchmark: {
          label: 'Benchmark',
          type: 'select',
          listValues: {
            '2': 2
          }
        },
        case_projected_scale: {
          label: 'Case Projected Scale',
          type: 'number'
        },
        ms_target_scale: {
          label: 'Ms Target Scale',
          type: 'number'
        },
        percent_correct: {
          label: 'Percent Correct',
          type: 'number'
        },
        projected_achievement_level: {
          label: 'Projected Achievement Level',
          type: 'select',
          listValues: {
            M: 'M'
          }
        },
        projected_growth: {
          label: 'Projected Growth',
          type: 'select',
          listValues: {
            '': null
          }
        },
        scale_diff: {
          label: 'Scale Diff',
          type: 'number'
        }
      }
    },
    case21_readings: {
      label: 'Case21 Readings',
      type: '!struct',
      subfields: {
        benchmark: {
          label: 'Benchmark',
          type: 'select',
          listValues: {
            '1': 1,
            '21': 21,
            '26': 26
          }
        },
        case_projected_scale: {
          label: 'Case Projected Scale',
          type: 'number'
        },
        ms_target_scale: {
          label: 'Ms Target Scale',
          type: 'number'
        },
        percent_correct: {
          label: 'Percent Correct',
          type: 'number'
        },
        projected_achievement_level: {
          label: 'Projected Achievement Level',
          type: 'select',
          listValues: {
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '2+': '2+',
            '4-': '4-',
            'B+': 'B+',
            '1+': '1+',
            'M-': 'M-',
            '4+': '4+',
            '2-': '2-',
            'P+': 'P+',
            M: 'M',
            B: 'B',
            'A-': 'A-',
            P: 'P',
            '5+': '5+',
            'P-': 'P-',
            'A+': 'A+',
            'B-': 'B-',
            '1-': '1-',
            A: 'A',
            '3+': '3+',
            '5-': '5-',
            'M+': 'M+',
            '3-': '3-'
          }
        },
        projected_growth: {
          label: 'Projected Growth',
          type: 'select',
          listValues: {
            '': '',
            N: 'N',
            Y: 'Y'
          }
        },
        scale_diff: {
          label: 'Scale Diff',
          type: 'number'
        }
      }
    },
    case21_sciences: {
      label: 'Case21 Sciences',
      type: '!struct',
      subfields: {
        benchmark: {
          label: 'Benchmark',
          type: 'select',
          listValues: {
            '2': 2
          }
        },
        case_projected_scale: {
          label: 'Case Projected Scale',
          type: 'number'
        },
        ms_target_scale: {
          label: 'Ms Target Scale',
          type: 'number'
        },
        percent_correct: {
          label: 'Percent Correct',
          type: 'number'
        },
        projected_achievement_level: {
          label: 'Projected Achievement Level',
          type: 'select',
          listValues: {
            P: 'P'
          }
        },
        projected_growth: {
          label: 'Projected Growth',
          type: 'select',
          listValues: {
            '': null
          }
        },
        scale_diff: {
          label: 'Scale Diff',
          type: 'number'
        }
      }
    },
    cpas: {
      label: 'Cpas',
      type: '!struct',
      subfields: {
        final_proficiency_description: {
          label: 'Final Proficiency Description',
          type: 'select',
          listValues: {
            Advanced: 'Advanced',
            Basic: 'Basic',
            Minimal: 'Minimal',
            Proficient: 'Proficient'
          }
        },
        final_score: {
          label: 'Final Score',
          type: 'number'
        },
        pass_fail_status: {
          label: 'Pass Fail Status',
          type: 'boolean'
        },
        teacher_name: {
          label: 'Teacher Name',
          type: 'select',
          listValues: {
            'T Evans': 'T Evans',
            'J Brownlow': 'J Brownlow',
            'M Wilson': 'M Wilson',
            'DeAnna Anderson': 'DeAnna Anderson',
            'Brooke Reid-Graves': 'Brooke Reid-Graves',
            'Gonzalez Jana': 'Gonzalez Jana',
            'T Bullock': 'T Bullock',
            'A Gipson': 'A Gipson',
            'Maskew Brian': 'Maskew Brian',
            'E Evans': 'E Evans'
          }
        },
        test_name: {
          label: 'Test Name',
          type: 'select',
          listValues: {
            'Business Fundamentals - Year 1': 'Business Fundamentals - Year 1',
            'Carpentry - Year 2': 'Carpentry - Year 2',
            'Engineering - Year 1': 'Engineering - Year 1',
            'Law and Public Safety - Year 1': 'Law and Public Safety - Year 1',
            'Healthcare and Clinical Services - Year 2':
              'Healthcare and Clinical Services - Year 2',
            'Digital Media Technology - Year 1':
              'Digital Media Technology - Year 1',
            'Digital Media Technology - Year 2':
              'Digital Media Technology - Year 2',
            'Early Childhood Education - Year 2':
              'Early Childhood Education - Year 2',
            'Management - Year 2': 'Management - Year 2',
            'Engineering - Year 2': 'Engineering - Year 2',
            'Foundations of Restaurant Management and Culinary Arts Level 2':
              'Foundations of Restaurant Management and Culinary Arts Level 2',
            'Polymer Science - Year 2': 'Polymer Science - Year 2',
            'Polymer Science - Year 1': 'Polymer Science - Year 1',
            'Construction - Core': 'Construction - Core',
            'Sports Medicine - Year 2': 'Sports Medicine - Year 2',
            'Early Childhood Education - Year 1':
              'Early Childhood Education - Year 1',
            'Foundations of Restaurant Management and Culinary Arts Level 1':
              'Foundations of Restaurant Management and Culinary Arts Level 1',
            'Health Sciences - Core': 'Health Sciences - Core',
            'Law and Public Safety - Year 2': 'Law and Public Safety - Year 2'
          }
        }
      }
    },
    dra_assessments: {
      label: 'Dra Assessments',
      type: '!struct',
      subfields: {
        assessment_status: {
          label: 'Assessment Status',
          type: 'select',
          listValues: {
            Complete: 'Complete'
          }
        },
        comprehension_score: {
          label: 'Comprehension Score',
          type: 'number'
        },
        dra_level: {
          label: 'Dra Level',
          type: 'select',
          listValues: {
            '2': '2'
          }
        },
        oral_reading_fluency: {
          label: 'Oral Reading Fluency',
          type: 'text'
        },
        reading_engagement_score: {
          label: 'Reading Engagement Score',
          type: 'number'
        }
      }
    },
    dra_word_analysis: {
      label: 'Dra Word Analysis',
      type: '!struct',
      subfields: {
        assessment_period_desc: {
          label: 'Assessment Period Desc',
          type: 'select',
          listValues: {
            'Grade 2 Assessment Period 2': 'Grade 2 Assessment Period 2'
          }
        },
        dra_level: {
          label: 'Dra Level',
          type: 'select',
          listValues: {
            '4': '4'
          }
        },
        status: {
          label: 'Status',
          type: 'select',
          listValues: {
            Complete: 'Complete'
          }
        },
        task_10_score: {
          label: 'Task 10 Score',
          type: 'number'
        },
        task_11_score: {
          label: 'Task 11 Score',
          type: 'number'
        },
        task_12_score: {
          label: 'Task 12 Score',
          type: 'number'
        },
        task_13_score: {
          label: 'Task 13 Score',
          type: 'number'
        },
        task_14_score: {
          label: 'Task 14 Score',
          type: 'number'
        },
        task_15_score: {
          label: 'Task 15 Score',
          type: 'number'
        },
        task_16_score: {
          label: 'Task 16 Score',
          type: 'number'
        },
        task_17_score: {
          label: 'Task 17 Score',
          type: 'number'
        },
        task_18_score: {
          label: 'Task 18 Score',
          type: 'number'
        },
        task_19_score: {
          label: 'Task 19 Score',
          type: 'number'
        },
        task_1_score: {
          label: 'Task 1 Score',
          type: 'number'
        },
        task_20_score: {
          label: 'Task 20 Score',
          type: 'number'
        },
        task_21_score: {
          label: 'Task 21 Score',
          type: 'number'
        },
        task_22_score: {
          label: 'Task 22 Score',
          type: 'number'
        },
        task_23_score: {
          label: 'Task 23 Score',
          type: 'number'
        },
        task_24_score: {
          label: 'Task 24 Score',
          type: 'number'
        },
        task_25_score: {
          label: 'Task 25 Score',
          type: 'number'
        },
        task_26_score: {
          label: 'Task 26 Score',
          type: 'number'
        },
        task_27_score: {
          label: 'Task 27 Score',
          type: 'number'
        },
        task_28_score: {
          label: 'Task 28 Score',
          type: 'number'
        },
        task_29_score: {
          label: 'Task 29 Score',
          type: 'number'
        },
        task_2_score: {
          label: 'Task 2 Score',
          type: 'number'
        },
        task_30_score: {
          label: 'Task 30 Score',
          type: 'number'
        },
        task_31_score: {
          label: 'Task 31 Score',
          type: 'number'
        },
        task_32_score: {
          label: 'Task 32 Score',
          type: 'number'
        },
        task_33_score: {
          label: 'Task 33 Score',
          type: 'number'
        },
        task_34_score: {
          label: 'Task 34 Score',
          type: 'number'
        },
        task_35_score: {
          label: 'Task 35 Score',
          type: 'number'
        },
        task_36_score: {
          label: 'Task 36 Score',
          type: 'number'
        },
        task_37_score: {
          label: 'Task 37 Score',
          type: 'number'
        },
        task_38_score: {
          label: 'Task 38 Score',
          type: 'number'
        },
        task_39_score: {
          label: 'Task 39 Score',
          type: 'number'
        },
        task_3_score: {
          label: 'Task 3 Score',
          type: 'number'
        },
        task_40_score: {
          label: 'Task 40 Score',
          type: 'number'
        },
        task_4_score: {
          label: 'Task 4 Score',
          type: 'number'
        },
        task_5_score: {
          label: 'Task 5 Score',
          type: 'number'
        },
        task_6_score: {
          label: 'Task 6 Score',
          type: 'number'
        },
        task_7_score: {
          label: 'Task 7 Score',
          type: 'number'
        },
        task_8_score: {
          label: 'Task 8 Score',
          type: 'number'
        },
        task_9_score: {
          label: 'Task 9 Score',
          type: 'number'
        },
        total_score: {
          label: 'Total Score',
          type: 'number'
        }
      }
    },
    els_ez_assessments: {
      label: 'Els Ez Assessments',
      type: '!struct',
      subfields: {
        proj_pl: {
          label: 'Proj Pl',
          type: 'number'
        },
        proj_ss: {
          label: 'Proj Ss',
          type: 'number'
        },
        ss_1: {
          label: 'Ss 1',
          type: 'number'
        },
        ss_2: {
          label: 'Ss 2',
          type: 'number'
        },
        ss_3: {
          label: 'Ss 3',
          type: 'number'
        },
        ss_4: {
          label: 'Ss 4',
          type: 'number'
        },
        ss_5: {
          label: 'Ss 5',
          type: 'number'
        },
        ss_6: {
          label: 'Ss 6',
          type: 'number'
        },
        sugg_avg: {
          label: 'Sugg Avg',
          type: 'number'
        },
        test: {
          label: 'Test',
          type: 'text'
        }
      }
    },
    els_ez_test_trackers: {
      label: 'Els Ez Test Trackers',
      type: '!struct',
      subfields: {
        rpt_cat_1: {
          label: 'Rpt Cat 1',
          type: 'number'
        },
        rpt_cat_2: {
          label: 'Rpt Cat 2',
          type: 'number'
        },
        rpt_cat_3: {
          label: 'Rpt Cat 3',
          type: 'number'
        },
        rpt_cat_4: {
          label: 'Rpt Cat 4',
          type: 'number'
        },
        rpt_cat_5: {
          label: 'Rpt Cat 5',
          type: 'number'
        },
        rpt_cat_6: {
          label: 'Rpt Cat 6',
          type: 'number'
        },
        rpt_cat_7: {
          label: 'Rpt Cat 7',
          type: 'number'
        }
      }
    },
    mcts: {
      label: 'Mcts',
      type: '!struct',
      subfields: {
        lunch: {
          label: 'Lunch',
          type: 'text'
        },
        langpl: {
          label: 'Langpl',
          type: 'select',
          listValues: {
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 4
          }
        },
        langss: {
          label: 'Langss',
          type: 'number'
        },
        mathpl: {
          label: 'Mathpl',
          type: 'select',
          listValues: {
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 4
          }
        },
        mathss: {
          label: 'Mathss',
          type: 'number'
        },
        sped: {
          label: 'Sped',
          type: 'text'
        }
      }
    },
    nwea_maps: {
      label: 'Nwea Maps',
      type: '!struct',
      subfields: {
        discipline: {
          label: 'Discipline',
          type: 'select',
          listValues: {
            Mathematics: 'Mathematics',
            Reading: 'Reading',
            Language: 'Language'
          }
        },
        term_name: {
          label: 'Term Name',
          type: 'select',
          listValues: {
            Q3: 'Q3',
            'Fall 2014-2015': 'Fall 2014-2015',
            'Winter 2014-2015': 'Winter 2014-2015',
            Q2: 'Q2',
            Q1: 'Q1',
            Q4: 'Q4'
          }
        },
        test_name: {
          label: 'Test Name',
          type: 'select',
          listValues: {
            'MAP: Math Primary Grades Common Core 2010 V2':
              'MAP: Math Primary Grades Common Core 2010 V2',
            'Survey: Reading 6+ Common Core 2010 V2':
              'Survey: Reading 6+ Common Core 2010 V2',
            'MAP: Reading 6+ Common Core 2010 V2':
              'MAP: Reading 6+ Common Core 2010 V2',
            'MAP: Math 6+ Common Core 2010 V2':
              'MAP: Math 6+ Common Core 2010 V2',
            'MAP: Reading 2-5 Common Core 2010 V2':
              'MAP: Reading 2-5 Common Core 2010 V2',
            'MAP: Reading Primary Grades Common Core 2010':
              'MAP: Reading Primary Grades Common Core 2010',
            'MAP: Language 2-12 Common Core 2010':
              'MAP: Language 2-12 Common Core 2010',
            'MAP: Math 2-5 Common Core 2010 V2':
              'MAP: Math 2-5 Common Core 2010 V2'
          }
        },
        test_percentile: {
          label: 'Test Percentile',
          type: 'number'
        },
        test_rit_score: {
          label: 'Test Rit Score',
          type: 'number'
        },
        test_type: {
          label: 'Test Type',
          type: 'select',
          listValues: {
            'Survey With Goals': 'Survey With Goals',
            Survey: 'Survey'
          }
        }
      }
    },
    psats: {
      label: 'Psats',
      type: '!struct',
      subfields: {
        percentile: {
          label: 'Percentile',
          type: 'number'
        },
        scale_score: {
          label: 'Scale Score',
          type: 'number'
        },
        school_code: {
          label: 'School Code',
          type: 'text'
        },
        test_date: {
          label: 'Test Date',
          type: 'date'
        },
        test_name: {
          label: 'Test Name',
          type: 'select',
          listValues: {
            PSAT: 'PSAT',
            'PSAT-Math': 'PSAT-Math',
            'PSAT-Writing': 'PSAT-Writing',
            'PSAT-Critical Reading': 'PSAT-Critical Reading'
          }
        }
      }
    },
    satps: {
      label: 'Satps',
      type: '!struct',
      subfields: {
        lunch: {
          label: 'Lunch',
          type: 'text'
        },
        pass: {
          label: 'Pass',
          type: 'text'
        },
        prof: {
          label: 'Prof',
          type: 'select',
          listValues: {
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4'
          }
        },
        retest: {
          label: 'Retest',
          type: 'text'
        },
        sped: {
          label: 'Sped',
          type: 'text'
        },
        test: {
          label: 'Test',
          type: 'text'
        },
        totss: {
          label: 'Totss',
          type: 'text'
        },
        type: {
          label: 'Type',
          type: 'text'
        }
      }
    },
    star_early_lits: {
      label: 'Star Early Lits',
      type: '!struct',
      subfields: {
        course_name: {
          label: 'Course Name',
          type: 'select',
          listValues: {
            MKAS: 'MKAS'
          }
        },
        export_grade: {
          label: 'Export Grade',
          type: 'select',
          listValues: {
            '0': '0'
          }
        },
        nce: {
          label: 'Nce',
          type: 'number'
        },
        pr: {
          label: 'Pr',
          type: 'number'
        },
        ss: {
          label: 'Ss',
          type: 'number'
        }
      }
    },
    star_maths: {
      label: 'Star Maths',
      type: '!struct',
      subfields: {
        course_name: {
          label: 'Course Name',
          type: 'select',
          listValues: {
            'Math 4': 'Math 4',
            'Widget Factories 101': 'Widget Factories 101'
          }
        },
        export_grade: {
          label: 'Export Grade',
          type: 'select',
          listValues: {
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9',
            '10': '10',
            '11': '11',
            '12': '12'
          }
        },
        ge: {
          label: 'Ge',
          type: 'number'
        },
        nce: {
          label: 'Nce',
          type: 'number'
        },
        pr: {
          label: 'Pr',
          type: 'number'
        },
        ss: {
          label: 'Ss',
          type: 'number'
        }
      }
    },
    star_readings: {
      label: 'Star Readings',
      type: '!struct',
      subfields: {
        course_name: {
          label: 'Course Name',
          type: 'select',
          listValues: {
            'Widget Factories 101': 'Widget Factories 101'
          }
        },
        export_grade: {
          label: 'Export Grade',
          type: 'select',
          listValues: {
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9',
            '10': '10',
            '12': '12'
          }
        },
        ge: {
          label: 'Ge',
          type: 'number'
        },
        irl: {
          label: 'Irl',
          type: 'number'
        },
        nce: {
          label: 'Nce',
          type: 'number'
        },
        pr: {
          label: 'Pr',
          type: 'number'
        },
        ss: {
          label: 'Ss',
          type: 'number'
        }
      }
    },
    tcaps: {
      label: 'Tcaps',
      type: '!struct',
      subfields: {
        achievement_level_total_for_math: {
          label: 'Achievement Level Total For Math',
          type: 'select',
          listValues: {
            '3': 3
          }
        },
        achievement_level_total_for_rla: {
          label: 'Achievement Level Total For Rla',
          type: 'select',
          listValues: {
            '4': 4
          }
        },
        achievement_level_total_for_science: {
          label: 'Achievement Level Total For Science',
          type: 'select',
          listValues: {
            '4': 4
          }
        },
        achievement_level_total_for_ss: {
          label: 'Achievement Level Total For Ss',
          type: 'select',
          listValues: {
            '3': 3
          }
        },
        scale_score_total_for_science: {
          label: 'Scale Score Total For Science',
          type: 'number'
        },
        scale_score_total_for_ss: {
          label: 'Scale Score Total For Ss',
          type: 'number'
        },
        scale_score_total_math: {
          label: 'Scale Score Total Math',
          type: 'number'
        },
        scale_score_total_rla: {
          label: 'Scale Score Total Rla',
          type: 'number'
        },
        school_name: {
          label: 'School Name',
          type: 'select',
          listValues: {
            'Anytown Jr Sr High School': 'Anytown Jr Sr High School'
          }
        }
      }
    },
    students: {
      label: 'Students',
      type: '!struct',
      subfields: {
        enrollment_status: {
          label: 'Enrollment Status',
          type: 'select',
          listValues: {
            u: 'u',
            i: 'i',
            E: 'E',
            U: 'U'
          }
        },
        sped: {
          label: 'Sped',
          type: 'select',
          listValues: {
            T: 'probably',
            U: 'shrug'
          }
        },
        gender: {
          label: 'Sex',
          type: 'select',
          listValues: {
            T: 'male?',
            F: false,
            U: 'female'
          }
        }
      }
    }
  },
  types: {
    text: {
      widgets: {
        text: {
          defaultOperator: 'is_empty',
          operators: [
            'equal',
            'not_equal',
            'is_empty',
            'is_not_empty',
            'proximity'
          ],
          widgetProps: {
            formatValue: (val, fieldDef, wgtDef, isForDisplay) =>
              '_' + JSON.stringify(val),
            valueLabel: 'Text',
            valuePlaceholder: 'Enter text'
          }
        },
        field: {
          operators: [
            'equal',
            'not_equal',
            //note that unary ops will be excluded anyway, see getWidgetsForFieldOp()
            //"is_empty",
            //"is_not_empty",
            'proximity'
          ]
        }
      }
    },
    number: {
      valueSources: ['value'],
      widgets: {
        number: {
          operators: [
            'equal',
            'not_equal',
            'less',
            'less_or_equal',
            'greater',
            'greater_or_equal',
            'between',
            'not_between',
            'is_empty',
            'is_not_empty'
          ],
          defaultOperator: 'less',
          widgetProps: {
            valueLabel: 'Number2',
            valuePlaceholder: 'Enter number2'
          }
        }
      }
    },
    date: {
      widgets: {
        date: {
          operators: [
            'equal',
            'not_equal',
            'less',
            'less_or_equal',
            'greater',
            'greater_or_equal',
            'between',
            'not_between',
            'is_empty',
            'is_not_empty'
          ]
        }
      }
    },
    time: {
      widgets: {
        time: {
          operators: [
            'equal',
            'not_equal',
            'less',
            'less_or_equal',
            'greater',
            'greater_or_equal',
            'between',
            'not_between',
            'is_empty',
            'is_not_empty'
          ]
        }
      }
    },
    datetime: {
      widgets: {
        datetime: {
          operators: [
            'equal',
            'not_equal',
            'less',
            'less_or_equal',
            'greater',
            'greater_or_equal',
            'between',
            'not_between',
            'is_empty',
            'is_not_empty'
          ],
          opProps: {
            between: {
              valueLabels: [
                {label: 'Date from', placeholder: 'Enrer datetime from'},
                {label: 'Date to', placeholder: 'Enter datetime to'}
              ]
            }
          },
          widgetProps: {
            timeFormat: 'HH:mm',
            dateFormat: 'YYYY-MM-DD',
            valueFormat: 'YYYY-MM-DD HH:mm'
          }
        }
      }
    },
    select: {
      mainWidget: 'select',
      widgets: {
        select: {
          operators: ['select_equals', 'select_not_equals'],
          widgetProps: {}
        },
        multiselect: {
          operators: ['select_any_in', 'select_not_any_in'],
          widgetProps: {}
        }
      }
    },
    multiselect: {
      widgets: {
        multiselect: {
          operators: ['multiselect_equals', 'multiselect_not_equals']
        }
      }
    },
    boolean: {
      widgets: {
        boolean: {
          operators: ['equal'],
          widgetProps: {
            //you can enable this if you don't use fields as value sources
            //hideOperator: true,
            //operatorInlineLabel: "is",
          }
        },
        field: {
          operators: ['equal', 'not_equal']
        }
      }
    }
  },
  operators: {
    equal: {
      label: 'is',
      labelForFormat: '==',
      reversedOp: 'not_equal',
      formatOp: (
        field,
        op,
        value,
        valueSrc,
        valueType,
        opDef,
        operatorOptions,
        isForDisplay
      ) => {
        return `${field} is ${value}`
      }
    },
    not_equal: {
      label: 'is not',
      labelForFormat: '!=',
      reversedOp: 'equal',
      formatOp: (
        field,
        op,
        value,
        valueSrc,
        valueType,
        opDef,
        operatorOptions,
        isForDisplay
      ) => {
        return `${field} is not ${value}`
      }
    },
    less: {
      label: 'is less than',
      labelForFormat: '<',
      reversedOp: 'greater_or_equal',
      formatOp: (
        field,
        op,
        value,
        valueSrc,
        valueType,
        opDef,
        operatorOptions,
        isForDisplay
      ) => {
        return `${field} is less than ${value}`
      }
    },
    less_or_equal: {
      label: 'is less than or equal to',
      labelForFormat: '<=',
      reversedOp: 'greater',
      formatOp: (
        field,
        op,
        value,
        valueSrc,
        valueType,
        opDef,
        operatorOptions,
        isForDisplay
      ) => {
        return `${field} is less than or equal to ${value}`
      }
    },
    greater: {
      label: 'is over',
      labelForFormat: '>',
      reversedOp: 'less_or_equal',
      formatOp: (
        field,
        op,
        value,
        valueSrc,
        valueType,
        opDef,
        operatorOptions,
        isForDisplay
      ) => {
        return `${field} is over ${value}`
      }
    },
    greater_or_equal: {
      label: 'is greater than or equal to',
      labelForFormat: '>=',
      reversedOp: 'less',
      formatOp: (
        field,
        op,
        value,
        valueSrc,
        valueType,
        opDef,
        operatorOptions,
        isForDisplay
      ) => {
        return `${field} is ${value}`
      }
    },

    //between: {
      //label: 'Between',
      //labelForFormat: 'BETWEEN',
      //cardinality: 2,
      //formatOp: (
        //field,
        //op,
        //values,
        //valueSrcs,
        //valueTypes,
        //opDef,
        //operatorOptions,
        //isForDisplay
      //) => {
        //let valFrom = values.first()
        //let valTo = values.get(1)
        //if (isForDisplay)
          //return `${field} >= ${valFrom} AND ${field} <= ${valTo}`
        //else return `${field} >= ${valFrom} && ${field} <= ${valTo}`
      //},
      //valueLabels: ['Value from', 'Value to'],
      //textSeparators: [null, 'and'],
      //reversedOp: 'not_between'
    //},
    //not_between: {
      //label: 'Not between',
      //labelForFormat: 'NOT BETWEEN',
      //cardinality: 2,
      //reversedOp: 'between',
      //valueLabels: ['Value from', 'Value to'],
      //textSeparators: [null, 'and'],
      //reversedOp: 'between'
    //},

    is_empty: {
      isUnary: true,
      label: 'Is Empty',
      labelForFormat: 'IS EMPTY',
      cardinality: 0,
      reversedOp: 'is_not_empty',
      formatOp: (
        field,
        op,
        value,
        valueSrc,
        valueType,
        opDef,
        operatorOptions,
        isForDisplay
      ) => {
        return isForDisplay ? `${field} is empty` : `!${field}`
      }
    },
    is_not_empty: {
      isUnary: true,
      label: 'Is not empty',
      labelForFormat: 'IS NOT EMPTY',
      cardinality: 0,
      reversedOp: 'is_empty',
      formatOp: (
        field,
        op,
        value,
        valueSrc,
        valueType,
        opDef,
        operatorOptions,
        isForDisplay
      ) => {
        return isForDisplay ? `${field} is not empty` : `!!${field}`
      }
    },
    select_equals: {
      label: 'is',
      labelForFormat: '==',
      formatOp: (
        field,
        op,
        value,
        valueSrc,
        valueType,
        opDef,
        operatorOptions,
        isForDisplay
      ) => {
        return `${field} is ${value}`
      },
      reversedOp: 'select_not_equals'
    },
    select_not_equals: {
      label: 'is not',
      labelForFormat: '!=',
      formatOp: (
        field,
        op,
        value,
        valueSrc,
        valueType,
        opDef,
        operatorOptions,
        isForDisplay
      ) => {
        return `${field} is not ${value}`
      },
      reversedOp: 'select_equals'
    },
    select_any_in: {
      label: 'is any of',
      labelForFormat: 'IN',
      formatOp: (
        field,
        op,
        values,
        valueSrc,
        valueType,
        opDef,
        operatorOptions,
        isForDisplay
      ) => {
        if (valueSrc == 'value') return `${field} in (${values.join(', ')})`
        else return `${field} in (${values})`
      },
      reversedOp: 'select_not_any_in'
    },
    select_not_any_in: {
      label: 'not any of',
      labelForFormat: 'NOT IN',
      formatOp: (
        field,
        op,
        values,
        valueSrc,
        valueType,
        opDef,
        operatorOptions,
        isForDisplay
      ) => {
        if (valueSrc == 'value') return `${field} not in (${values.join(', ')})`
        else return `${field} not in (${values})`
      },
      reversedOp: 'select_any_in'
    },
    multiselect_equals: {
      label: 'is one of',
      labelForFormat: '==',
      formatOp: (
        field,
        op,
        values,
        valueSrc,
        valueType,
        opDef,
        operatorOptions,
        isForDisplay
      ) => {
        if (valueSrc == 'value') return `${field} is equal to [${values.join(', or ')}]`
        else return `${field} is equal to ${values}`
      },
      reversedOp: 'multiselect_not_equals'
    },
    multiselect_not_equals: {
      label: 'not one of',
      labelForFormat: '!=',
      formatOp: (
        field,
        op,
        values,
        valueSrc,
        valueType,
        opDef,
        operatorOptions,
        isForDisplay
      ) => {
        if (valueSrc == 'value') return `${field} is not equal to [${values.join(', or ')}]`
        else return `${field} not equal to ${values}`
      },
      reversedOp: 'multiselect_equals'
    },

    //proximity: {
      //label: 'Proximity search',
      //cardinality: 2,
      //valueLabels: [
        //{label: 'Word 1', placeholder: 'Enter first word'},
        //'Word 2'
      //],
      //textSeparators: [
        ////'Word 1',
        ////'Word 2'
      //],
      //formatOp: (
        //field,
        //op,
        //values,
        //valueSrc,
        //valueType,
        //opDef,
        //operatorOptions,
        //isForDisplay
      //) => {
        //let val1 = values.first()
        //let val2 = values.get(1)
        //return `${field} ${val1} NEAR/${operatorOptions.get(
          //'proximity'
        //)} ${val2}`
      //},
      //options: {
        //optionLabel: 'Near',
        //optionTextBefore: 'Near',
        //optionPlaceholder: 'Select words between',
        //factory: (props) => <ProximityOperator {...props} />,
        //defaults: {
          //proximity: 2
        //}
      //}
    //}
  },
  widgets: {
    text: {
      type: 'text',
      valueSrc: 'value',
      factory: (props) => <TextWidget {...props} />,
      formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
        return isForDisplay ? '"' + val + '"' : JSON.stringify(val)
      },
      validateValue: (val, fieldDef) => {
        return val != 'test'
      }
    },
    number: {
      type: 'number',
      valueSrc: 'value',
      factory: (props) => <NumberWidget {...props} />,
      valueLabel: 'Number',
      valuePlaceholder: 'Enter number',
      formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
        return isForDisplay ? val : JSON.stringify(val)
      }
    },
    select: {
      type: 'select',
      valueSrc: 'value',
      factory: (props) => <SelectWidget {...props} showSearch />,
      formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
        let valLabel = fieldDef.listValues[val]
        return isForDisplay ? '"' + valLabel + '"' : JSON.stringify(val)
      }
    },
    multiselect: {
      type: 'multiselect',
      valueSrc: 'value',
      factory: (props) => <MultiSelectWidget {...props} />,
      formatValue: (vals, fieldDef, wgtDef, isForDisplay) => {
        let valsLabels = vals.map((v) => fieldDef.listValues[v])
        return isForDisplay
          ? valsLabels.map((v) => '"' + v + '"')
          : vals.map((v) => JSON.stringify(v))
      }
    },
    date: {
      type: 'date',
      valueSrc: 'value',
      factory: (props) => <DateWidget {...props} />,
      dateFormat: 'DD.MM.YYYY',
      valueFormat: 'YYYY-MM-DD',
      formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
        let dateVal = moment(val, wgtDef.valueFormat)
        return isForDisplay
          ? '"' + dateVal.format(wgtDef.dateFormat) + '"'
          : JSON.stringify(val)
      }
    },
    time: {
      type: 'time',
      valueSrc: 'value',
      factory: (props) => <TimeWidget {...props} />,
      timeFormat: 'HH:mm',
      valueFormat: 'HH:mm:ss',
      formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
        let dateVal = moment(val, wgtDef.valueFormat)
        return isForDisplay
          ? '"' + dateVal.format(wgtDef.timeFormat) + '"'
          : JSON.stringify(val)
      }
    },
    datetime: {
      type: 'datetime',
      valueSrc: 'value',
      factory: (props) => <DateTimeWidget {...props} />,
      timeFormat: 'HH:mm',
      dateFormat: 'DD.MM.YYYY',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
        let dateVal = moment(val, wgtDef.valueFormat)
        return isForDisplay
          ? '"' +
              dateVal.format(wgtDef.dateFormat + ' ' + wgtDef.timeFormat) +
              '"'
          : JSON.stringify(val)
      }
    },
    boolean: {
      type: 'boolean',
      valueSrc: 'value',
      factory: (props) => <BooleanWidget {...props} />,
      labelYes: 'Yes',
      labelNo: 'No ',
      formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
        return isForDisplay ? (val ? 'Yes' : 'No') : JSON.stringify(!!val)
      },
      defaultValue: false
    },
    field: {
      valueSrc: 'field',
      factory: (props) => <ValueFieldWidget {...props} />,
      formatValue: (val, fieldDef, wgtDef, isForDisplay, valFieldDef) => {
        return isForDisplay ? valFieldDef.label || val : val
      },
      valueLabel: 'Field to compare',
      valuePlaceholder: 'Select field to compare'
    }
  },
  settings: {
    locale: {
      short: 'en',
      full: 'en-US',
      antd: en_US
    },
    maxLabelsLength: 50,
    hideConjForOne: true,
    renderSize: 'small',
    renderConjsAsRadios: false,
    renderFieldAndOpAsDropdown: false,
    setOpOnChangeField: ['keep', 'default'], // 'default' (default if present), 'keep' (keep prev from last field), 'first', 'none'
    clearValueOnChangeField: false, //false - if prev & next fields have same type (widget), keep
    clearValueOnChangeOp: false,
    setDefaultFieldAndOp: false,
    maxNesting: 10,
    fieldSeparator: '.',
    fieldSeparatorDisplay: ', ',
    showLabels: false,
    valueLabel: 'Value',
    valuePlaceholder: 'Value',
    fieldLabel: 'Field',
    operatorLabel: 'Operator',
    fieldPlaceholder: 'Select field',
    operatorPlaceholder: 'Select operator',
    deleteLabel: null,
    addGroupLabel: 'Add group',
    addRuleLabel: 'Add rule',
    delGroupLabel: null,
    canLeaveEmptyGroup: true, //after deletion
    formatReverse: (
      q,
      operator,
      reversedOp,
      operatorDefinition,
      revOperatorDefinition,
      isForDisplay
    ) => {
      if (isForDisplay) return 'NOT(' + q + ')'
      else return '!(' + q + ')'
    },
    formatField: (
      field,
      parts,
      label2,
      fieldDefinition,
      config,
      isForDisplay
    ) => {
      if (isForDisplay) return label2
      else return field
    },
    valueSourcesInfo: {
      value: {
        label: 'Value'
      },
      field: {
        label: 'Field',
        widget: 'field'
      }
    },
    valueSourcesPopupTitle: 'Select value source',
    canReorder: true,
    canCompareFieldWithField: (
      leftField,
      leftFieldConfig,
      rightField,
      rightFieldConfig
    ) => {
      //for type == 'select'/'multiselect' you can check listValues
      return true
    }
  }
}
